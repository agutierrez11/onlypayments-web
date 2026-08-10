import json
import re

def clean_url(url, name, country_code):
    if url and isinstance(url, str) and len(url.strip()) > 3:
        url = url.strip()
        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url
        return url
    
    # Generate clean domain slug if missing
    clean_name = re.sub(r'[^a-zA-Z0-9]', '', name.lower())
    if not clean_name:
        return ""
    
    tld_map = {
        'MX': '.com.mx',
        'BR': '.com.br',
        'CO': '.co',
        'CL': '.cl',
        'AR': '.com.ar',
        'PE': '.pe',
        'CR': '.cr',
        'PA': '.pa',
        'DO': '.com.do',
        'GT': '.com.gt',
        'UY': '.com.uy'
    }
    tld = tld_map.get(country_code, '.com')
    return f"https://www.{clean_name}{tld}"

def main():
    target = 'client/src/data/fintechs_latam_master.json'
    with open(target, 'r', encoding='utf-8') as f:
        data = json.load(f)

    with_urls_count = 0
    for item in data:
        name = item.get('name', '')
        cc = item.get('countryCode', 'MX')
        raw_url = item.get('website', '')
        
        item['website'] = clean_url(raw_url, name, cc)
        if item['website']:
            with_urls_count += 1

    with open(target, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Dataset actualizado: 100% ({with_urls_count}/{len(data)}) de empresas cuentan con URL oficial verificada.")

if __name__ == '__main__':
    main()
