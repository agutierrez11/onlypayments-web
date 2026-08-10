import json

def audit():
    with open('client/src/data/fintechs_latam_master.json', 'r', encoding='utf-8') as f:
        fintechs = json.load(f)

    print(f"Total Fintechs en Master: {len(fintechs)}")

    vertical_keywords = {
        'paytech': ['pagos', 'paytech', 'pasarela', 'adquirencia', 'e-commerce', 'checkout', 'pos', 'payment', 'gateway'],
        'neobanks': ['neobanco', 'banca digital', 'baas', 'cuenta digital', 'digital bank'],
        'lending': ['crédito', 'credito', 'préstamo', 'prestamo', 'lending', 'bnpl', 'microcrédito', 'financiamiento'],
        'openfinance': ['open finance', 'open banking', 'api', 'agregación', 'agregador'],
        'insurtech': ['insurtech', 'seguro', 'póliza', 'poliza', 'insurance'],
        'regtech': ['regtech', 'kyc', 'aml', 'fraude', 'identidad', 'compliance', 'biometría'],
        'wealthtech': ['wealthtech', 'inversión', 'inversion', 'trading', 'broker', 'patrimonio', 'bolsa'],
        'crypto': ['crypto', 'cripto', 'activos digitales', 'blockchain', 'web3', 'stablecoin', 'bitcoin', 'usdt'],
        'remesas': ['remesas', 'cross-border', 'transferencia internacional', 'fx', 'divisas', 'payout'],
        'igaming': ['gaming', 'gambling', 'igaming', 'apuestas', 'casino', 'sportsbook'],
        'crowdfunding': ['crowdfunding', 'financiamiento colectivo', 'inmobiliario participativo']
    }

    counts = {k: 0 for k in vertical_keywords}

    for f in fintechs:
        text = f"{f.get('name', '')} {f.get('segment', '')} {f.get('vertical', '')} {f.get('description', '')}".lower()
        for v, kws in vertical_keywords.items():
            if any(kw in text for kw in kws):
                counts[v] += 1

    print("\n--- CONTEO EMPÍRICO EXACTO (ZERO ASSUMPTION) ---")
    for k, v in counts.items():
        print(f"'{k}': {v} entidades verificadas")

if __name__ == '__main__':
    audit()
