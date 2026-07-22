import json
import os

print("Building enriched fintech dataset for client...")

# Read original fintechs_latam.json
with open('client/src/data/fintechs_latam.json', 'r', encoding='utf-8') as f:
    latam_data = json.load(f)

# Read verified_clean_data.json
with open('verified_clean_data.json', 'r', encoding='utf-8') as f:
    clean_data = json.load(f)

formatted = []
seen_names = set()

# Process latam_data
for item in latam_data:
    name = (item.get("Nombre") or item.get("nombre") or "").strip()
    if name and name.lower() not in seen_names:
        seen_names.add(name.lower())
        formatted.append({
            "Nombre": name,
            "Segmento": item.get("Segmento") or item.get("Vertical") or "Fintech",
            "Descripción": item.get("Descripción") or item.get("descripcion") or "",
            "País": item.get("País") or item.get("pais") or "LATAM",
            "Vertical": item.get("Vertical") or item.get("Segmento") or "Fintech"
        })

# Process clean_data
for item in clean_data:
    name = (item.get("nombre") or item.get("Nombre") or "").strip()
    if not name:
        continue
    
    desc = item.get("descripcion") or item.get("Descripción") or ""
    segmento = item.get("vertical") or item.get("Segmento") or "Fintech"
    pais = item.get("pais") or item.get("País") or "LATAM"
    
    if name.lower() not in seen_names:
        seen_names.add(name.lower())
        formatted.append({
            "Nombre": name,
            "Segmento": segmento,
            "Descripción": desc,
            "País": pais,
            "Vertical": segmento
        })

print(f"Total merged entities: {len(formatted)}")

# Save to client/src/data/fintechs_latam.json
with open('client/src/data/fintechs_latam.json', 'w', encoding='utf-8') as f:
    json.dump(formatted, f, ensure_ascii=False, indent=2)

print("Saved updated fintechs_latam.json cleanly!")
