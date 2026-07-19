import json
import csv
import os

target_folder = r"C:\Users\Antonio\OneDrive\Escritorio\NERV_GTM_Archivo_2026\02_NERV_Datos\NERV INTELIGENCIA"

json_file = os.path.join(target_folder, "NERV_GOD_MASTER_ULTIMATE_2026.json")
csv_file = os.path.join(target_folder, "NERV_ULTIMATE_MASTER_FINAL.csv")

def analyze_json(path):
    print(f"\n--- Analizando: {os.path.basename(path)} ---")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if isinstance(data, list):
            print(f"Tipo: Lista JSON")
            print(f"Total registros: {len(data)}")
            
            # Extract sample and keys
            if len(data) > 0:
                print("Columnas/Llaves encontradas:")
                print(list(data[0].keys()))
                
                # Count basic stats
                has_url = sum(1 for item in data if item.get('website') or item.get('url'))
                has_country = sum(1 for item in data if item.get('pais') or item.get('country') or item.get('origen'))
                print(f"Con URL: {has_url}")
                print(f"Con País: {has_country}")
                
                print("\nEjemplo 1 (Random):")
                print(json.dumps(data[0], indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"Error: {e}")

def analyze_csv(path):
    print(f"\n--- Analizando: {os.path.basename(path)} ---")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            headers = next(reader)
            
            print(f"Tipo: CSV")
            print("Columnas/Llaves encontradas:")
            print(headers)
            
            row_count = sum(1 for row in reader)
            print(f"Total registros: {row_count}")
    except Exception as e:
        print(f"Error: {e}")

analyze_json(json_file)
analyze_csv(csv_file)
