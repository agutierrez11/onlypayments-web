import json
import os
import csv
import re

# The best files based on the audit
FILES_TO_MERGE = [
    r"C:\Users\Antonio\OneDrive\Escritorio\NERV_GTM_Archivo_2026\02_NERV_Datos\NERV INTELIGENCIA\NERV_GTM_MASTER_3.0_TOTAL.csv",
    r"C:\Users\Antonio\OneDrive\Escritorio\NERV_GTM_Archivo_2026\02_NERV_Datos\NERV INTELIGENCIA\NERV_GTM_MASTER_2.0_CLEANED_PRO.csv",
    r"C:\Users\Antonio\OneDrive\Escritorio\NERV_GTM_Archivo_2026\02_NERV_Datos\NERV INTELIGENCIA\NERV_GOD_MASTER_CLEAN.csv",
    r"C:\Users\Antonio\OneDrive\Escritorio\NERV_SUMSUB_Consolidado\NERV INTELIGENCIA\NERV_GOD_MASTER_ULTIMATE_2026.json",
    r"C:\Users\Antonio\OneDrive\Escritorio\NERV_SUMSUB_Consolidado\NERV INTELIGENCIA\NERV_GOLD_MASTER_V2026.csv"
]

OUTPUT_CLEAN = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\verified_clean_data.json"
OUTPUT_QUARANTINE = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\quarantine.json"

def normalize_name(name):
    if not name: return ""
    name = str(name).lower().strip()
    name = re.sub(r'[^a-z0-9]', '', name)
    return name

def is_garbage_url(url):
    if not url or str(url).strip().lower() in ['null', 'nan', 'n/a', '', 'none']: return True
    if len(str(url)) < 5: return True
    if 'example.com' in str(url): return True
    return False

def is_garbage_desc(desc):
    if not desc or str(desc).strip().lower() in ['null', 'nan', 'n/a', '', 'none']: return True
    words = str(desc).split()
    if len(words) < 5: return True
    if len(set(str(desc).lower())) < 5: return True 
    return False

def merge_data():
    companies = {}
    
    for file_path in FILES_TO_MERGE:
        if not os.path.exists(file_path):
            continue
            
        print(f"Leyendo: {os.path.basename(file_path)}")
        data = []
        try:
            if file_path.endswith('.json'):
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    data = json.load(f)
            elif file_path.endswith('.csv'):
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        data.append(row)
        except Exception as e:
            print(f"Error leyendo {file_path}: {e}")
            continue
            
        for item in data:
            raw_name = item.get('nombre', '') or item.get('Name', '') or item.get('Company', '')
            if not raw_name or str(raw_name).lower() in ['null', 'nan', 'n/a', '']:
                continue
                
            norm_name = normalize_name(raw_name)
            if not norm_name:
                continue
                
            raw_url = item.get('website', '') or item.get('Website', '') or item.get('URL', '')
            raw_desc = item.get('descripcion', '') or item.get('Forensic DNA (The Hook)', '') or item.get('Description', '')
            raw_country = item.get('pais', '') or item.get('País', '') or item.get('Country', '')
            raw_vertical = item.get('vertical', '') or item.get('Vertical', '')
            
            if norm_name not in companies:
                companies[norm_name] = {
                    'nombre': raw_name,
                    'website': raw_url,
                    'descripcion': raw_desc,
                    'pais': raw_country,
                    'vertical': raw_vertical,
                    'fuentes_fusionadas': 1
                }
            else:
                existing = companies[norm_name]
                existing['fuentes_fusionadas'] += 1
                
                # Update URL if existing is garbage and new is good
                if is_garbage_url(existing['website']) and not is_garbage_url(raw_url):
                    existing['website'] = raw_url
                    
                # Update Description if existing is garbage and new is good
                if is_garbage_desc(existing['descripcion']) and not is_garbage_desc(raw_desc):
                    existing['descripcion'] = raw_desc
                    
                # Prefer longer descriptions if both are good
                elif not is_garbage_desc(existing['descripcion']) and not is_garbage_desc(raw_desc):
                    if len(str(raw_desc)) > len(str(existing['descripcion'])):
                        existing['descripcion'] = raw_desc
                        
                if not existing['pais'] and raw_country and raw_country != 'nan':
                    existing['pais'] = raw_country
                    
                if not existing['vertical'] and raw_vertical and raw_vertical != 'nan':
                    existing['vertical'] = raw_vertical

    clean = []
    quarantine = []
    
    for norm_name, data in companies.items():
        if is_garbage_url(data['website']) or is_garbage_desc(data['descripcion']):
            quarantine.append(data)
        else:
            clean.append(data)
            
    print(f"\nTotal de empresas unicas encontradas (con nombre): {len(companies)}")
    print(f"Empresas PURAS (Pasan Cuarentena): {len(clean)}")
    print(f"Empresas BASURA (A Cuarentena): {len(quarantine)}")
    
    with open(OUTPUT_CLEAN, 'w', encoding='utf-8') as f:
        json.dump(clean, f, indent=4, ensure_ascii=False)
        
    with open(OUTPUT_QUARANTINE, 'w', encoding='utf-8') as f:
        json.dump(quarantine, f, indent=4, ensure_ascii=False)
        
    print(f"\nArchivo limpio guardado en: {OUTPUT_CLEAN}")
    print(f"Archivo cuarentena guardado en: {OUTPUT_QUARANTINE}")

if __name__ == "__main__":
    merge_data()
