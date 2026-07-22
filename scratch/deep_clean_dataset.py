import json

file_path = r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\client\src\data\fintechs_latam.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Cleaning UTF-8 artifacts across all fields
def clean_str(s):
    if not isinstance(s, str):
        return ""
    return s.replace("CrÃ©dito Digital", "Crédito Digital") \
            .replace("GestiÃ³n de Finanzas", "Gestión de Finanzas") \
            .replace("Activos Digitales", "Activos Digitales") \
            .replace("Finanzas Personales", "Finanzas Personales") \
            .replace("Puntaje de CrÃ©dito", "Puntaje de Crédito") \
            .replace("180Â°", "180°") \
            .replace("Ã©", "é").replace("Ã³", "ó").replace("Ã¡", "á") \
            .replace("Ã­", "í").replace("Ãº", "ú").replace("Ã±", "ñ") \
            .replace("Â", "").strip()

fintech_segments = [
    "Neobancos", "Crédito Digital", "Crowdfunding", "Insurtech", "Activos Digitales",
    "Paytech", "WealthTech", "BFM", "Regtech", "Proptech", "Open Finance", "SaaS",
    "E-Commerce", "Marketplace", "Pagos", "Billing", "Puntos de Venta", "PYME",
    "Retail", "Remesas", "Cross-Border", "Gaming", "Gambling", "iGaming"
]

valid_list = []
for item in data:
    name = clean_str(item.get("Nombre", ""))
    seg = clean_str(item.get("Segmento", ""))
    vert = clean_str(item.get("Vertical", ""))
    country = clean_str(item.get("País", ""))
    desc = clean_str(item.get("Descripción", ""))

    if not name or len(name) < 2:
        continue

    valid_list.append({
        "Nombre": name,
        "Segmento": seg or "Fintech",
        "Descripción": desc,
        "País": country or "LATAM",
        "Vertical": vert or seg or "Fintech"
    })

print(f"Total entries after deep clean & UTF-8 normalization: {len(valid_list)}")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(valid_list, f, ensure_ascii=False, indent=2)
