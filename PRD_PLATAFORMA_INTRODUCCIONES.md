# 📖 DOCUMENTO DE ESPECIFICACIONES TÉCNICAS (PRD)

**Proyecto:** Plataforma Descentralizada de Introducciones B2B (Mapeo Semántico de Confianza)  
**Arquitectura:** Node.js (TypeScript) + PostgreSQL (pgvector + fuzzystrmatch) + Python (Agentes OSINT) + Stripe Connect.

## 🗄️ PARTE 1: MODELO DE BASE DE DATOS E INFRAESTRUCTURA (PostgreSQL)
Configuración completa de extensiones, tablas, relaciones de confianza híbrida, tags taxonómicos y la matriz de indexación de alta velocidad.

```sql
-- 1. HABILITAR EXTENSIONES DE INFRAESTRUCTURA CORE
CREATE EXTENSION IF NOT EXISTS vector;          -- Embeddings Semánticos (OpenAI)
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;   -- Distancia de Levenshtein (Errores de dedo)
CREATE EXTENSION IF NOT EXISTS pg_trgm;         -- Pre-filtrado veloz por Trigramas

-- 2. TABLA MAESTRA DE USUARIOS (Miembros de la comunidad)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    company_normalized VARCHAR(100),
    role_normalized VARCHAR(100),
    stripe_connect_id VARCHAR(100) UNIQUE,      -- ID Express para transferencia directa bancaria
    reputation_score NUMERIC(3,2) DEFAULT 5.00, -- Calificación RLHF viva de respuestas (0.00 a 5.00)
    profile_vector vector(1536),                -- Embedding del perfil del usuario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA DE COMUNIDADES / GRUPOS DE WHATSAPP (Afiliados / Admins)
CREATE TABLE communities (
    id SERIAL PRIMARY KEY,
    whatsapp_group_id VARCHAR(50) UNIQUE NOT NULL,
    admin_name VARCHAR(100) NOT NULL,
    stripe_connect_id VARCHAR(100) UNIQUE,      -- ID Financiero del Admin del grupo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA DEL GRAFO DE CONTACTOS (Soberanía de Datos y Capa Temporal)
CREATE TYPE data_source_type AS ENUM ('MANUAL', 'LINKEDIN', 'RLHF_VERIFIED');

CREATE TABLE graph_connections (
    id SERIAL PRIMARY KEY,
    owner_user_id INT REFERENCES users(id) ON DELETE CASCADE,
    origin_community_id INT REFERENCES communities(id),
    target_company VARCHAR(100) NOT NULL,
    target_role VARCHAR(100) NOT NULL,
    company_role_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA-256 generado en el Cliente (Zero-Knowledge)
    standardized_keywords TEXT[] NOT NULL,         -- Array de tokens taxonómicos cerrados
    tags_vector vector(1536),                     -- Embedding semántico de OpenAI
    data_source data_source_type NOT NULL DEFAULT 'LINKEDIN',
    data_trust_weight NUMERIC(3,2) NOT NULL DEFAULT 0.50, -- Peso según la frescura del dato
    is_active_relation BOOLEAN DEFAULT TRUE,      -- Desactivado por RLHF si el contacto cambió de trabajo
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. MATRIZ DE ÍNDICES DE RENDIMIENTO (Búsquedas < 10ms)
CREATE INDEX idx_graph_company_trgm ON graph_connections USING gin (LOWER(target_company) gin_trgm_ops);
CREATE INDEX idx_graph_keywords_gin ON graph_connections USING gin (standardized_keywords);
CREATE INDEX idx_graph_vector_hnsw ON graph_connections USING hnsw (tags_vector vector_cosine_ops);
CREATE INDEX idx_connections_source_weight ON graph_connections(data_source, data_trust_weight);
```

## 💻 PARTE 2: PIPELINE DE MIGRACIÓN Y ESTANDARIZACIÓN DE DATOS (Node.js)
Este script se encarga del onboarding web. Recibe los registros del navegador, los clasifica usando IA dentro de un diccionario cerrado para evitar ruido y genera los embeddings vectoriales.

```typescript
import { OpenAI } from 'openai';
import { Pool } from 'pg';
import crypto from 'crypto';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const db = new Pool({ connectionString: process.env.DATABASE_URL });

const OFFICIAL_KEYWORDS = {
    roles: ['ROLE_FINANCE_CFO', 'ROLE_PAYMENTS_HEAD', 'ROLE_TECH_CTO', 'ROLE_FOUNDER_CEO'],
    techs: ['TECH_GATEWAY', 'TECH_ANTI_FRAUDE', 'TECH_ALTERNATIVE_PAYMENTS', 'TECH_ORCHESTRATION']
};

interface RawContact {
    company: string;
    title: string;
}

export async function runLinkedInMigrationPipeline(userId: number, contactsBatch: RawContact[]) {
    for (const contact of contactsBatch) {
        try {
            // Paso A: Clasificación taxonómica en diccionario cerrado
            const classification = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `Mapea el puesto a nuestras palabras clave oficiales. 
                                  Roles: ${JSON.stringify(OFFICIAL_KEYWORDS.roles)}
                                  Tecnologías: ${JSON.stringify(OFFICIAL_KEYWORDS.techs)}
                                  Responde estrictamente un JSON: {'company_clean': 'str', 'keywords': []}`
                    },
                    { role: "user", content: `Empresa: "${contact.company}" | Puesto: "${contact.title}"` }
                ],
                response_format: { type: "json_object" }
            });

            const cleanData = JSON.parse(classification.choices.message.content!);
            
            // Paso B: Generación del Vector Semántico (Embedding)
            const textToEmbed = `${cleanData.company_clean} ${contact.title} ${cleanData.keywords.join(' ')}`.toLowerCase();
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: textToEmbed,
            });
            const vectorString = `[${embeddingResponse.data[0].embedding.join(',')}]`;

            // Paso C: Hash SHA-256 (Privacidad del Grafo)
            const rawHashStr = `${cleanData.company_clean.toLowerCase().trim()}_${contact.title.toLowerCase().trim()}`;
            const privacyHash = crypto.createHash('sha256').update(rawHashStr).digest('hex');

            // Paso D: Inserción en Base de Datos
            await db.query(
                `INSERT INTO graph_connections 
                 (owner_user_id, target_company, target_role, company_role_hash, standardized_keywords, tags_vector, data_source, data_trust_weight)
                 VALUES ($1, $2, $3, $4, $5, $6::vector, 'LINKEDIN', 0.50)
                 ON CONFLICT (company_role_hash) DO NOTHING`,
                [userId, cleanData.company_clean, contact.title, privacyHash, cleanData.keywords, vectorString]
            );
        } catch (err) {
            console.error("Error en fila de migración:", err);
        }
    }
}
```

## 🧠 PARTE 3: MOTOR DE BÚSQUEDA HÍBRIDA TOTAL (Node.js)
La consulta core del backend. Resuelve errores tipográficos y de aproximación fonética en marcas vía Levenshtein, procesa filtros de palabras clave exactas y calcula la cercanía semántica del vector para entregar un score compuesto.

```typescript
export async function executeTotalHybridSearch(whatsappInput: string, extractedKeyword: string, requesterPhone: string) {
    const cleanInput = whatsappInput.toLowerCase().trim();

    // 1. Resolver el embedding de la intención de WhatsApp
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: cleanInput,
    });
    const vectorString = `[${embeddingResponse.data[0].embedding.join(',')}]`;

    // 2. Consulta Híbrida: Trigramas + Levenshtein + Keywords + pgvector + Pesos de Confianza
    const query = `
        SELECT g.id, g.target_company, g.target_role, g.data_source, u.stripe_connect_id,
               (1 - (g.tags_vector <=> $1::vector)) as semantic_similarity,
               levenshtein(LOWER(g.target_company), $2) as lev_distance,
               (
                 ((1 - (g.tags_vector <=> $1::vector)) * g.data_trust_weight) 
                 - (levenshtein(LOWER(g.target_company), $2) * 0.05)
               ) as total_composite_score
        FROM graph_connections g
        JOIN users u ON g.owner_user_id = u.id
        WHERE (g.target_company % $2 OR $3 = ANY(g.standardized_keywords))
        AND u.phone_number != $4
        AND g.is_active_relation = TRUE
        AND levenshtein(LOWER(g.target_company), $2) <= 3
        ORDER BY total_composite_score DESC LIMIT 3;
    `;

    const result = await db.query(query, [vectorString, cleanInput, extractedKeyword, requesterPhone]);
    return result.rows;
}
```

## 💳 PARTE 4: MOTOR DE DISPERSIÓN FINANCIERA (Stripe Connect Split Payouts)
Controlador para automatizar el cobro del lead (Pay-per-Intro de $150.00 USD) y dispersar las comisiones en el mismo milisegundo a las cuentas Express de los nodos ganadores.

```typescript
export async function processLeadPaymentAndSplit(leadId: string, company: string, role: string, requesterPhone: string, paymentMethodId: string) {
    const totalAmount = 15000; // $150.00 USD en centavos
    
    // Ejecuta la Búsqueda Híbrida Interna para resolver el flujo (Se omite código repetitivo de resolución)
    const matchType = 'CONNECTOR'; // Ejemplo resuelto: Conector de grafo
    const destinationStripeId = 'acct_1234xxx'; 
    const adminStripeId = 'acct_5678yyy';

    let transferDestinationAmount = totalAmount * 0.70; // $105.00 USD para el conector de la comunidad
    let adminTransferAmount = totalAmount * 0.10;       // $15.00 USD para la caja de la comunidad (Fintech Bar)
    // El 20% restante ($30.00 USD) se queda neto en tu cuenta como tarifa de software

    // 1. Ejecutar el cobro directo al comprador (off-session)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        off_session: true,
    });

    if (paymentIntent.status === 'succeeded') {
        // 2. Dispersar transferencia automatizada al miembro dueño de la red
        await stripe.transfers.create({
            amount: transferDestinationAmount,
            currency: 'usd',
            destination: destinationStripeId,
            transfer_group: `group_lead_${leadId}`,
        });

        // 3. Dispersar transferencia al administrador de la comunidad aliada
        if (adminTransferAmount > 0) {
            await stripe.transfers.create({
                amount: adminTransferAmount,
                currency: 'usd',
                destination: adminStripeId,
                transfer_group: `group_lead_${leadId}`,
            });
        }
        return { success: true };
    }
}
```

## 🕸️ PARTE 5: ENJAMBRE FALLBACK DE BÚSQUEDA EXTERNA (Python OSINT)
Se ejecuta asíncronamente mediante una cola de Redis cuando la base de datos local devuelve cero resultados (NOT_FOUND), mapeando el organigrama actual en la web mediante raspado e IA.

```python
import os, requests, json
from bs4 import BeautifulSoup
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def execute_swarm_scraping_fallback(target_company: str, target_role: str):
    search_query = f'site:://linkedin.com "{target_role}" "{target_company}"'
    url = f"https://duckduckgo.com{requests.utils.quote(search_query)}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        snippets = [result.get_text() for result in soup.find_all('a', class_='result__snippet')]
        raw_context = "\n".join(snippets)

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un extractor de organigramas B2B. Devuelve estrictamente un JSON válido con el nombre encontrado de la persona y su url de perfil."},
                {"role": "user", "content": f"Compañía: {target_company}\nRol: {target_role}\nTexto:\n{raw_context}"}
            ],
            response_format={ "type": "json_object" }
        )
        return {"match_found": True, "data": json.loads(completion.choices.message.content)}
    except Exception as e:
        return {"error": str(e), "match_found": False}
```

## 📑 PARTE 6: RESUMEN DEL MODELO DE NEGOCIO PARA LA REUNIÓN (El Pitch Elegante)

**¿Qué es?** 
No es un directorio plano de PR. Es un Hub de Inteligencia Operativa y un Marketplace B2B de Intención de Compra Basado en Capital Social.

**¿Cómo genera valor?** 
Resuelve el problema del cold outreach tradicional. Los proveedores de software (Adyen, Riskified, etc.) pagan $150.00 USD por una "Introducción Calificada" (Pay-per-Intro), la cual garantiza una llamada de 15 minutos con un CFO/CTO con interés real en resolver una fricción técnica (ej. mitigar contracargos).

**¿Cómo se distribuyen los ingresos?**
- **70% ($105.00 USD):** Va directo al miembro de la comunidad que tiene el contacto de confianza.
- **15% ($22.50 USD):** Se inyecta a la caja de Fintech Bar (el socio distribuidor) para financiar sus desayunos y meetups.
- **15% ($22.50 USD):** Cubre tu mantenimiento de infraestructura de software y APIs.

**Evolución del Sponsorship:** 
Permite transformar los patrocinios físicos inestables de $2,000 USD por evento en una suscripción de patrocinio mensual recurrente (SaaS + Lead Gen), dándole a los sponsors créditos de intros automatizados rastreados de forma semántica en los grupos de WhatsApp de la comunidad.
