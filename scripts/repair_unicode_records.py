import json
import re

def clean_spanish_unicode(text):
    if not text:
        return ""
    text = str(text).strip()
    if text.lower() == "nan":
        return ""

    replacements = [
        (r'M[\ufffd\?]?xico', 'México'),
        (r'Per[\ufffd\?]', 'Perú'),
        (r'Panam[\ufffd\?]', 'Panamá'),
        (r'Bogot[\ufffd\?]', 'Bogotá'),
        (r'Medell[\ufffd\?]n', 'Medellín'),
        (r'S[\ufffd\?a]o Paulo', 'São Paulo'),
        (r'Bras[\ufffd\?]lia', 'Brasília'),
        (r'Valpara[\ufffd\?]so', 'Valparaíso'),
        (r'Am[\ufffd\?]rica', 'América'),
        (r'Latinoam[\ufffd\?]rica', 'Latinoamérica'),
        (r'Centroam[\ufffd\?]rica', 'Centroamérica'),
        (r'Iberoam[\ufffd\?]rica', 'Iberoamérica'),
        (r'tecnol[\ufffd\?]gic[ao]s?', lambda m: 'tecnológicas' if 'as' in m.group(0) else ('tecnológica' if 'a' in m.group(0) else 'tecnológico')),
        (r'tecnolog[\ufffd\?]a', 'tecnología'),
        (r'inversi[\ufffd\?]n', 'inversión'),
        (r'inversiones', 'inversiones'),
        (r'adopci[\ufffd\?]n', 'adopción'),
        (r'informaci[\ufffd\?]n', 'información'),
        (r'gesti[\ufffd\?]n', 'gestión'),
        (r'soluci[\ufffd\?]n', 'solución'),
        (r'expansi[\ufffd\?]n', 'expansión'),
        (r'integraci[\ufffd\?]n', 'integración'),
        (r'operaci[\ufffd\?]n', 'operación'),
        (r'innovaci[\ufffd\?]n', 'innovación'),
        (r'digitalizaci[\ufffd\?]n', 'digitalización'),
        (r'conciliaci[\ufffd\?]n', 'conciliación'),
        (r'evaluaci[\ufffd\?]n', 'evaluación'),
        (r'transacci[\ufffd\?]n', 'transacción'),
        (r'financiaci[\ufffd\?]n', 'financiación'),
        (r'automatizaci[\ufffd\?]n', 'automatización'),
        (r'verificaci[\ufffd\?]n', 'verificación'),
        (r'autenticaci[\ufffd\?]n', 'autenticación'),
        (r'bancarizaci[\ufffd\?]n', 'bancarización'),
        (r'cr[\ufffd\?]dito', 'crédito'),
        (r'electr[\ufffd\?]nic[ao]s?', lambda m: 'electrónicos' if 'os' in m.group(0) else ('electrónica' if 'a' in m.group(0) else 'electrónico')),
        (r'garant[\ufffd\?]a', 'garantía'),
        (r'compa[\ufffd\?][\ufffd\?]?a', 'compañía'),
        (r'd[\ufffd\?]a', 'día'),
        (r'l[\ufffd\?]der', 'líder'),
        (r'pa[\ufffd\?]s', 'país'),
        (r'pa[\ufffd\?]ses', 'países'),
        (r'm[\ufffd\?]s', 'más'),
        (r'est[\ufffd\?] ', 'está '),
        (r'est[\ufffd\?]n', 'están'),
        (r'tambi[\ufffd\?]n', 'también'),
        (r'alg[\ufffd\?]n', 'algún'),
        (r'seg[\ufffd\?]n', 'según'),
        (r'l[\ufffd\?]nea', 'línea'),
        (r'n[\ufffd\?]mero', 'número'),
        (r'plataforma', 'plataforma'),
        (r'[\ufffd]', '') # Remove any remaining stray replacement character
    ]

    for pattern, repl in replacements:
        if callable(repl):
            text = re.sub(pattern, repl, text, flags=re.IGNORECASE)
        else:
            text = re.sub(pattern, repl, text, flags=re.IGNORECASE)

    # Normalize double spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def process_file():
    target = 'client/src/data/fintechs_latam_master.json'
    with open(target, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        item['name'] = clean_spanish_unicode(item.get('name', ''))
        item['description'] = clean_spanish_unicode(item.get('description', ''))
        item['country'] = clean_spanish_unicode(item.get('country', ''))
        item['state'] = clean_spanish_unicode(item.get('state', ''))
        item['vertical'] = clean_spanish_unicode(item.get('vertical', ''))
        item['regulation'] = clean_spanish_unicode(item.get('regulation', ''))
        
        if 'rails' in item and isinstance(item['rails'], list):
            item['rails'] = [clean_spanish_unicode(r) for r in item['rails']]

    with open(target, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Limpieza profunda completada en {len(data)} registros de {target}")

if __name__ == '__main__':
    process_file()
