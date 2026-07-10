import { invokeLLM } from "./_core/llm";
import { insertNews } from "./db";
import type { InsertNews } from "../drizzle/schema";

/**
 * Sample news sources for LATAM payments ecosystem
 * In production, these would be RSS feeds or API endpoints
 */
const NEWS_SOURCES = [
  {
    country: "Brasil",
    title: "Banco Central implementa novo sistema de pagamentos instantâneos",
    content: "O Banco Central do Brasil anunciou a implementação de um novo sistema de pagamentos instantâneos que permitirá transações 24/7...",
    sourceUrl: "https://example.com/news/1",
  },
  {
    country: "México",
    title: "Regulación de fintech en México: nuevos requisitos de compliance",
    content: "La CNBV (Comisión Nacional Bancaria y de Valores) publicó nuevos requisitos de cumplimiento normativo para empresas fintech...",
    sourceUrl: "https://example.com/news/2",
  },
  {
    country: "Colombia",
    title: "Aumento de transacciones transfronterizas en el Pacto Andino",
    content: "Las transacciones transfronterizas entre países andinos aumentaron un 45% en el último trimestre, impulsadas por nuevas pasarelas de pago...",
    sourceUrl: "https://example.com/news/3",
  },
];

interface CuratedNews {
  title: string;
  summary: string;
  category: "A2A" | "transfronterizo" | "IA" | "regulación";
  impactAndTools: string;
}

/**
 * Curate a single news item using LLM
 */
async function curateNewsItem(newsItem: {
  country: string;
  title: string;
  content: string;
  sourceUrl: string;
}): Promise<CuratedNews | null> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert in LATAM payments ecosystem. Your task is to curate news articles about payments, fintech, and financial technology in Latin America.

For each news item, you must:
1. Create a concise 3-line summary that captures the key information
2. Categorize it as one of: A2A (Account-to-Account), transfronterizo (Cross-border), IA (AI/Artificial Intelligence), or regulación (Regulation)
3. Write an "Impacto y Herramientas" section that:
   - Explains the business impact for different stakeholders (e-commerce, SaaS, remittances)
   - Recommends specific tools or services to implement
   - Provides actionable steps

Return a JSON object with this exact structure:
{
  "title": "string",
  "summary": "string (3 lines max)",
  "category": "A2A" | "transfronterizo" | "IA" | "regulación",
  "impactAndTools": "string (markdown format with ## headers and bullet points)"
}`,
        },
        {
          role: "user",
          content: `Please curate this news item from ${newsItem.country}:

Title: ${newsItem.title}
Content: ${newsItem.content}

Return only valid JSON, no additional text.`,
        },
      ],
    });

    // Extract text from response
    let responseText = "";
    if (typeof response === "string") {
      responseText = response;
    } else if (response && typeof response === "object" && "text" in response) {
      responseText = (response as { text: string }).text;
    } else if (Array.isArray(response)) {
      const firstItem = response[0];
      if (typeof firstItem === "string") {
        responseText = firstItem;
      } else if (firstItem && typeof firstItem === "object" && "text" in firstItem) {
        responseText = (firstItem as { text: string }).text;
      }
    }

    if (!responseText) {
      console.error("Could not extract text from LLM response");
      return null;
    }

    // Parse the JSON response
    const curatedData = JSON.parse(responseText) as CuratedNews;
    return curatedData;
  } catch (error) {
    console.error("Error curating news item:", error);
    return null;
  }
}

/**
 * Main function to process and curate news
 */
export async function processAndCurateNews() {
  console.log(`[LLM Curator] Starting news curation at ${new Date().toISOString()}`);

  const results = {
    processed: 0,
    successful: 0,
    failed: 0,
  };

  for (const newsItem of NEWS_SOURCES) {
    results.processed++;
    console.log(`[LLM Curator] Processing: ${newsItem.title}`);

    try {
      const curatedNews = await curateNewsItem(newsItem);

      if (!curatedNews) {
        results.failed++;
        console.warn(`[LLM Curator] Failed to curate: ${newsItem.title}`);
        continue;
      }

      // Prepare the news item for database insertion
      const newsToInsert: InsertNews = {
        title: curatedNews.title,
        summary: curatedNews.summary,
        content: newsItem.content,
        category: curatedNews.category,
        country: newsItem.country,
        sourceUrl: newsItem.sourceUrl,
        impactAndTools: curatedNews.impactAndTools,
        publishedAt: new Date(),
        createdAt: new Date(),
      };

      // Insert into database
      await insertNews(newsToInsert);
      results.successful++;
      console.log(`[LLM Curator] Successfully curated and saved: ${newsItem.title}`);
    } catch (error) {
      results.failed++;
      console.error(`[LLM Curator] Error processing ${newsItem.title}:`, error);
    }
  }

  console.log(`[LLM Curator] Curation complete:`, results);
  return results;
}

/**
 * Scheduled handler for daily news curation
 * This function is called by the Heartbeat scheduler
 */
export async function handleDailyNewsCuration() {
  try {
    const results = await processAndCurateNews();
    return {
      ok: true,
      results,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[LLM Curator] Fatal error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}
