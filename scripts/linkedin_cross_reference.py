import os
import zipfile
import csv
import json
import re
from difflib import SequenceMatcher

FINTECH_GOLD = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\verified_fintech_gold.json"
OUTPUT_REPORT = r"C:\Users\Antonio\.gemini\antigravity-ide\brain\df80b853-c7c6-4238-8d93-8eb0b558ada3\linkedin_gtm_matches.md"

def normalize_name(name):
    if not name: return ""
    name = str(name).lower().strip()
    # Remove common corporate suffixes to improve matching
    name = re.sub(r'\b(inc|llc|ltd|sa|s\.a\.|s de rl|ltda|group|holdings|technologies|tech)\b', '', name)
    name = re.sub(r'[^a-z0-9]', '', name)
    return name

def extract_linkedin_connections(zip_paths):
    connections_dict = {}
    for zpath in zip_paths:
        if not os.path.exists(zpath):
            continue
        try:
            with zipfile.ZipFile(zpath, 'r') as z:
                if 'Connections.csv' in z.namelist():
                    with z.open('Connections.csv') as f:
                        content = f.read().decode('utf-8').splitlines()
                        start_idx = 0
                        for i, line in enumerate(content):
                            if line.startswith('First Name'):
                                start_idx = i
                                break
                        
                        reader = csv.DictReader(content[start_idx:])
                        for row in reader:
                            # Deduplicate using a unique key
                            first = row.get('First Name', '').strip()
                            last = row.get('Last Name', '').strip()
                            comp = row.get('Company', '').strip()
                            key = f"{first}_{last}_{comp}"
                            if key not in connections_dict:
                                connections_dict[key] = row
        except Exception as e:
            print(f"Error extrayendo {zpath}: {e}")
    return list(connections_dict.values())

def run_cross_reference():
    print("Iniciando Motor de Cruce (LinkedIn GTM Monetization)...")
    
    # 1. Load the Gold Fintechs
    if not os.path.exists(FINTECH_GOLD):
        print(f"Error: No se encontró {FINTECH_GOLD}. El motor Nivel 2 debe terminar primero.")
        return
        
    with open(FINTECH_GOLD, 'r', encoding='utf-8') as f:
        fintechs = json.load(f)
        
    print(f"Empresas Fintech GOLD cargadas: {len(fintechs)}")
    
    # 2. Find LinkedIn ZIP files
    zip_paths = []
    for root, _, files in os.walk(r"C:\Users\Antonio"):
        for file in files:
            if 'LinkedInDataExport' in file and file.endswith('.zip'):
                zip_paths.append(os.path.join(root, file))
                
    for root, _, files in os.walk(r"C:\Refugio Final"):
        for file in files:
            if 'LinkedInDataExport' in file and file.endswith('.zip'):
                zip_paths.append(os.path.join(root, file))
                
    print(f"Archivos ZIP de LinkedIn encontrados: {len(zip_paths)}")
    
    # 3. Extract connections
    connections = extract_linkedin_connections(zip_paths)
    print(f"Contactos de LinkedIn extraídos: {len(connections)}")
    
    if not connections:
        print("No se encontraron contactos en los ZIPs. Abortando cruce.")
        return
        
    # 4. Perform Matching
    matches = []
    
    # Pre-compute normalized names
    norm_fintechs = [(f, normalize_name(f.get('nombre', ''))) for f in fintechs]
    
    for conn in connections:
        company = conn.get('Company', '')
        if not company: continue
        
        norm_conn_company = normalize_name(company)
        if len(norm_conn_company) < 3: continue
        
        # Check against all fintechs
        for fintech, norm_ft in norm_fintechs:
            if len(norm_ft) < 3: continue
            
            # Substring match (e.g. "nubank" in "nubank brasil ltda")
            if norm_ft in norm_conn_company or norm_conn_company in norm_ft:
                matches.append({
                    'contact': f"{conn.get('First Name', '')} {conn.get('Last Name', '')}".strip(),
                    'position': conn.get('Position', ''),
                    'linkedin_company': company,
                    'fintech_name': fintech.get('nombre'),
                    'fintech_url': fintech.get('website'),
                    'vertical': fintech.get('vertical')
                })
                break
                
    # 5. Generate Report
    print(f"¡Cruce exitoso! Encontrados {len(matches)} contactos (Warm Leads).")
    
    # Sort matches by fintech name
    matches.sort(key=lambda x: x['fintech_name'])
    
    with open(OUTPUT_REPORT, 'w', encoding='utf-8') as f:
        f.write("# 💼 Reporte GTM Monetización: Leads Calientes (LinkedIn Matches)\n\n")
        f.write("> [!TIP]\n> Estas son las empresas **100% verificadas (Nivel 2)** donde tienes **Contactos Directos (1st Degree)** en tu red de LinkedIn. Estos son leads calientes listos para monetizar.\n\n")
        
        if not matches:
            f.write("No se encontraron coincidencias exactas entre tu red y el Goldmine.")
            return
            
        f.write(f"**Total de Oportunidades Encontradas:** {len(matches)}\n\n")
        
        current_company = ""
        for m in matches:
            if m['fintech_name'] != current_company:
                current_company = m['fintech_name']
                f.write(f"\n## 🏢 [{current_company}]({m['fintech_url']})\n")
                f.write(f"**Vertical:** {m['vertical']}\n\n")
                
            f.write(f"- 👤 **{m['contact']}**\n")
            f.write(f"  - *Cargo:* {m['position']}\n")
            f.write(f"  - *Empresa en LinkedIn:* {m['linkedin_company']}\n")
            
    print(f"Reporte generado en: {OUTPUT_REPORT}")

if __name__ == "__main__":
    run_cross_reference()
