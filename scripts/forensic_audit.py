import json
import os
import re
from collections import Counter

file_path = r"C:\Users\Antonio\OneDrive\Escritorio\NERV_GTM_Archivo_2026\02_NERV_Datos\NERV INTELIGENCIA\NERV_GOD_MASTER_ULTIMATE_2026.json"

def is_garbage_url(url):
    if not url or str(url).strip() in ['null', 'nan', 'N/A', '', 'None']: return True
    if len(str(url)) < 5: return True
    if 'example.com' in str(url): return True
    return False

def is_garbage_desc(desc):
    if not desc or str(desc).strip() in ['null', 'nan', 'N/A', '', 'None']: return True
    words = str(desc).split()
    if len(words) < 5: return True
    # Check for pure gibberish like 'asdasd'
    if len(set(str(desc).lower())) < 5: return True 
    return False

def run_audit():
    print("=== INICIANDO AUDITORIA FORENSE BRUTAL ===")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    total = len(data)
    print(f"Total de registros a auditar: {total}")
    
    garbage_urls = 0
    garbage_names = 0
    garbage_desc = 0
    duplicates = 0
    
    names_seen = set()
    
    for item in data:
        name = item.get('nombre', '')
        url = item.get('website', '')
        desc = item.get('descripcion', '') or item.get('Forensic DNA (The Hook)', '')
        
        # Name check
        if not name or str(name).strip() in ['null', 'nan', 'N/A', '']:
            garbage_names += 1
        elif str(name).lower().strip() in names_seen:
            duplicates += 1
        else:
            names_seen.add(str(name).lower().strip())
            
        # URL check
        if is_garbage_url(url):
            garbage_urls += 1
            
        # Desc check
        if is_garbage_desc(desc):
            garbage_desc += 1
            
    print("\n--- RESULTADOS DE BASURA ENCONTRADA ---")
    print(f"Empresas sin nombre válido: {garbage_names} ({(garbage_names/total)*100:.2f}%)")
    print(f"Empresas duplicadas exactas: {duplicates} ({(duplicates/total)*100:.2f}%)")
    print(f"Empresas con URL basura/vacía: {garbage_urls} ({(garbage_urls/total)*100:.2f}%)")
    print(f"Empresas con descripción inútil (< 5 palabras): {garbage_desc} ({(garbage_desc/total)*100:.2f}%)")
    
    clean_records = total - (garbage_names + duplicates + garbage_urls + garbage_desc)
    # Note: A record could have multiple garbage flags, so this is an approximation of pure clean records.
    
    print("\n--- MUESTRA DE BASURA (URLs) ---")
    bad_url_samples = [item for item in data if is_garbage_url(item.get('website'))][:5]
    for b in bad_url_samples:
        print(f"Name: {b.get('nombre')} | URL: {b.get('website')}")
        
    print("\n--- MUESTRA DE BASURA (Descripciones) ---")
    bad_desc_samples = [item for item in data if is_garbage_desc(item.get('descripcion') or item.get('Forensic DNA (The Hook)'))][:5]
    for b in bad_desc_samples:
        print(f"Name: {b.get('nombre')} | DESC: {b.get('descripcion') or b.get('Forensic DNA (The Hook)')}")

if __name__ == "__main__":
    run_audit()
