import os
import zipfile
import json

# Directorios a buscar
SEARCH_DIRS = [
    os.path.expanduser(r'~\Downloads'),
    os.path.expanduser(r'~\OneDrive\Escritorio'),
    r'C:\Refugio Final',
    os.path.expanduser(r'~\AppData\Local\Temp')
]

KEYWORDS = ['fintech', 'payment', 'radar', 'gtm', 'nerv', 'ecosistema', 'sofom', 'sofipo']
EXTENSIONS = ['.json', '.csv', '.md']

inventory = {
    'zips_found': [],
    'data_files': []
}

def matches_keywords(text):
    text_lower = text.lower()
    return any(k in text_lower for k in KEYWORDS)

def scan_directory(directory):
    if not os.path.exists(directory):
        return
        
    print(f"Escaneando: {directory}...")
    for root, dirs, files in os.walk(directory):
        # Evitar carpetas pesadas que no sirven
        if any(skip in root.lower() for skip in ['node_modules', '.git', 'cache', 'chrome']):
            continue
            
        for file in files:
            file_lower = file.lower()
            full_path = os.path.join(root, file)
            
            # Es un ZIP que hace match?
            if file_lower.endswith('.zip'):
                if matches_keywords(file_lower) or matches_keywords(os.path.basename(root)):
                    inventory['zips_found'].append(full_path)
            
            # Es un archivo de datos que hace match?
            ext = os.path.splitext(file_lower)[1]
            if ext in EXTENSIONS:
                if matches_keywords(file_lower) or matches_keywords(os.path.basename(root)):
                    # Sacamos el tamaño para saber qué tan grande es
                    try:
                        size_kb = os.path.getsize(full_path) / 1024
                        inventory['data_files'].append({
                            'path': full_path,
                            'size_kb': round(size_kb, 2),
                            'type': ext
                        })
                    except Exception:
                        pass

for d in SEARCH_DIRS:
    scan_directory(d)

# Guardar el reporte
report_path = os.path.expanduser(r'~\.gemini\antigravity-ide\scratch\onlypayments\inventory_report.json')
with open(report_path, 'w', encoding='utf-8') as f:
    json.dump(inventory, f, indent=4)

print(f"\n--- REPORTE ---")
print(f"Total ZIPs sospechosos encontrados: {len(inventory['zips_found'])}")
print(f"Total Archivos de Datos (JSON, CSV, MD) encontrados: {len(inventory['data_files'])}")
print(f"Reporte detallado guardado en: {report_path}")
