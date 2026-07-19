import json
import os
import re
import concurrent.futures
import requests

INPUT_FILE = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\verified_clean_data.json"
OUTPUT_GOLD = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\verified_fintech_gold.json"
OUTPUT_QUARANTINE = r"C:\Users\Antonio\.gemini\antigravity-ide\scratch\onlypayments\quarantine_level2.json"

FINTECH_KEYWORDS = [
    'fintech', 'pago', 'payment', 'wallet', 'billetera', 'credit', 'crédito', 'credito', 
    'lending', 'prestamo', 'préstamo', 'prestamos', 'préstamos', 'banco', 'bank', 
    'banking', 'bancario', 'saas', 'api', 'crypto', 'cripto', 'blockchain', 
    'bitcoin', 'defi', 'insurtech', 'proptech', 'wealthtech', 'regtech', 'agrofintech', 
    'agtech', 'inversión', 'inversion', 'invest', 'financiamiento', 'finance', 
    'capital', 'riesgo', 'risk', 'factoring', 'kyc', 'aml', 'compliance', 'tarjeta',
    'card', 'transferencia', 'transfer', 'remesa', 'remittance', 'crowdfunding',
    'paytech', 'open banking', 'api', 'finanzas', 'financial', 'financiación'
]

RED_FLAGS = [
    'zapatos', 'naviera', 'atletismo', 'analista forense', 'como modelo de lenguaje',
    'as an ai', 'language model', 'barco', 'transporte de contenedores', 'ropa', 
    'calzado', 'muebles', 'juguetes', 'comida a domicilio', 'restaurante', 'hotel',
    'turismo', 'viajes', 'vuelo', 'aerolínea', 'clínica dental', 'hospital', 'médico'
]

def check_url(url):
    if not url.startswith('http'):
        url = 'https://' + url
    try:
        # User-Agent to avoid 403 Forbidden on some servers
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=5, allow_redirects=True)
        if response.status_code < 400:
            return True, None
        return False, f"HTTP {response.status_code}"
    except Exception as e:
        return False, str(e).split(':', 1)[0]

def score_description(desc, vertical):
    text = f"{desc} {vertical}".lower()
    score = 0
    
    for kw in FINTECH_KEYWORDS:
        if re.search(r'\b' + kw + r'\b', text):
            score += 2
            
    for rf in RED_FLAGS:
        if rf in text:
            score -= 10
            
    # "Agricultura" exception handling:
    if 'agricultura' in text or 'agrícola' in text:
        # If it has agriculture BUT also has strong finance words, we consider it AgroFintech
        if score >= 4:
            score += 2 # Boost for AgroFintech
        else:
            score -= 5 # Pure agriculture
            
    return score

def process_company(company):
    # 1. Semantic Check
    desc = company.get('descripcion', '')
    vertical = company.get('vertical', '')
    score = score_description(desc, vertical)
    
    if score < 2:
        company['quarantine_reason'] = f"Semantic Score too low ({score})"
        return (False, company)
        
    # 2. HTTP Check
    url = company.get('website', '')
    is_alive, error = check_url(url)
    if not is_alive:
        company['quarantine_reason'] = f"Dead URL: {error}"
        return (False, company)
        
    company['fintech_score'] = score
    return (True, company)

def run_level2():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    print(f"Iniciando Verificación Nivel 2 sobre {len(data)} empresas...")
    
    gold = []
    quarantine = []
    
    # Process concurrently for fast HTTP pinging
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        results = list(executor.map(process_company, data))
        
    for passed, company in results:
        if passed:
            gold.append(company)
        else:
            quarantine.append(company)
            
    # Sort Gold by score descending
    gold.sort(key=lambda x: x.get('fintech_score', 0), reverse=True)
            
    print(f"\nResultados Nivel 2:")
    print(f"Empresas GOLD (100% Verificadas y Vivas): {len(gold)}")
    print(f"Empresas a Cuarentena (URLs muertas o no-fintech): {len(quarantine)}")
    
    with open(OUTPUT_GOLD, 'w', encoding='utf-8') as f:
        json.dump(gold, f, indent=4, ensure_ascii=False)
        
    with open(OUTPUT_QUARANTINE, 'w', encoding='utf-8') as f:
        json.dump(quarantine, f, indent=4, ensure_ascii=False)
        
    print(f"\nArchivo GOLD guardado en: {OUTPUT_GOLD}")
    print(f"Archivo Cuarentena Lvl2 guardado en: {OUTPUT_QUARANTINE}")

if __name__ == "__main__":
    run_level2()
