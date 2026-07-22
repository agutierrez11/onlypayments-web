import json
import re

file_path = r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\client\src\data\fintechs_latam.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

initial_count = len(data)

# Words that indicate a non-fintech company in description or name
non_fintech_keywords = [
    "transporte marítimo", "carga marítima", "embarques", "contenedores",
    "valparaíso", "fletes marítimos", "logística de contenedores",
    "agencia de viajes", "turismo", "restaurante", "supermercado físico"
]

cleaned_data = []
removed_items = []

for item in data:
    name = str(item.get("Nombre", "")).strip()
    desc = str(item.get("Descripción", "")).strip().lower()
    segment = str(item.get("Segmento", "")).strip()
    vertical = str(item.get("Vertical", "")).strip()

    # Check if item matches non-fintech keywords
    is_invalid = any(kw in desc or kw in name.lower() for kw in non_fintech_keywords)
    
    if is_invalid:
        removed_items.append(name)
    else:
        cleaned_data.append(item)

print(f"Initial: {initial_count}")
print(f"Cleaned: {len(cleaned_data)}")
print(f"Removed: {removed_items}")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(cleaned_data, f, ensure_ascii=False, indent=2)

print("Dataset cleaned successfully.")
