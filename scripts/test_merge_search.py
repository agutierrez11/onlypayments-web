import json
import os

with open('verified_clean_data.json', 'r', encoding='utf-8') as f:
    clean_data = json.load(f)

print(f"Verified clean data length: {len(clean_data)}")

with open('client/src/data/fintechs_latam.json', 'r', encoding='utf-8') as f:
    latam_data = json.load(f)

print(f"Current client latam data length: {len(latam_data)}")

# Map clean entries
formatted = []
seen_names = set()

# First add latam_data entries
for item in latam_data:
    name = item.get("Nombre", "").strip()
    if name:
        seen_names.add(name.lower())
        formatted.append({
            "Nombre": name,
            "Segmento": item.get("Segmento") or item.get("Vertical") or "Fintech",
            "Descripción": item.get("Descripción") or "",
            "País": item.get("País") or "LATAM",
            "Vertical": item.get("Vertical") or item.get("Segmento") or "Fintech"
        })

# Then enrich with verified_clean_data
added_from_clean = 0
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
        added_from_clean += 1

print(f"Total merged entries: {len(formatted)} (Added {added_from_clean} unique records from clean data)")

# Test search queries
queries = ["sofom", "core bancario", "core banking", "baas", "lending", "factoraje"]
for q in queries:
    matches = [
        e for e in formatted
        if q in str(e.get("Nombre") or "").lower() 
        or q in str(e.get("Descripción") or "").lower() 
        or q in str(e.get("Segmento") or "").lower() 
        or q in str(e.get("Vertical") or "").lower()
    ]
    print(f"\n--- Query '{q}': {len(matches)} results ---")
    for m in matches[:5]:
        print(f"  • {m['Nombre']} | {m['Segmento']} | {m['Descripción'][:80]}...")

