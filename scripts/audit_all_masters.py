import json
import os
import re
import csv

INVENTORY_FILE = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\inventory_report.json"

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

def audit_file(file_path):
    total = 0
    garbage_urls = 0
    garbage_names = 0
    garbage_desc = 0
    
    try:
        if file_path.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                data = json.load(f)
                if not isinstance(data, list):
                    return None # Might be a single object or dict
        elif file_path.endswith('.csv'):
            data = []
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    data.append(row)
        else:
            return None

        total = len(data)
        if total == 0: return None
        
        for item in data:
            name = item.get('nombre', '') or item.get('Name', '') or item.get('Company', '')
            url = item.get('website', '') or item.get('Website', '') or item.get('URL', '')
            desc = item.get('descripcion', '') or item.get('Forensic DNA (The Hook)', '') or item.get('Description', '')
            
            if not name or str(name).strip().lower() in ['null', 'nan', 'n/a', '']:
                garbage_names += 1
            if is_garbage_url(url):
                garbage_urls += 1
            if is_garbage_desc(desc):
                garbage_desc += 1
                
        return {
            'total': total,
            'bad_names': garbage_names,
            'bad_urls': garbage_urls,
            'bad_desc': garbage_desc
        }
    except Exception as e:
        return f"ERROR: {str(e)}"

def run_global_audit():
    with open(INVENTORY_FILE, 'r', encoding='utf-8') as f:
        inventory = json.load(f)
        
    data_files = inventory.get('data_files', [])
    
    # Target keywords that indicate it's a master database file
    keywords = ['MASTER', 'GOD', 'GOLD', 'CLEAN', 'ULTIMATE', 'NERV_GTM']
    
    target_files = []
    for f in data_files:
        path = f['path']
        fname = os.path.basename(path).upper()
        if (path.endswith('.json') or path.endswith('.csv')) and any(k in fname for k in keywords):
            target_files.append(path)
            
    # Deduplicate paths
    target_files = list(set(target_files))
    
    print("="*80)
    print("INICIANDO AUDITORIA GLOBAL DE TODOS LOS ARCHIVOS MAESTROS (PC COMPLETA)")
    print(f"Archivos sospechosos de ser bases de datos maestras encontrados: {len(target_files)}")
    print("="*80 + "\n")
    
    for path in target_files:
        print(f"Auditando: {os.path.basename(path)}")
        print(f"Ruta: {path}")
        result = audit_file(path)
        
        if isinstance(result, dict):
            t = result['total']
            print(f"  -> Total Registros: {t}")
            print(f"  -> Sin Nombre   : {result['bad_names']} ({(result['bad_names']/t)*100:.1f}%)")
            print(f"  -> URL Basura   : {result['bad_urls']} ({(result['bad_urls']/t)*100:.1f}%)")
            print(f"  -> Desc Basura  : {result['bad_desc']} ({(result['bad_desc']/t)*100:.1f}%)")
        elif result is None:
            print("  -> (Archivo vacío o formato no soportado)")
        else:
            print(f"  -> {result}")
        print("-" * 50)

if __name__ == "__main__":
    run_global_audit()
