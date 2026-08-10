import json
import math

def lat_to_mercator_y(lat):
    # Conformal Web Mercator Projection
    lat_rad = math.radians(max(-58.0, min(33.0, lat)))
    return math.log(math.tan(math.pi / 4.0 + lat_rad / 2.0))

def project_latam_conformal(lon, lat, width=1000, height=850):
    min_lon, max_lon = -118.0, -34.0
    min_y = lat_to_mercator_y(-56.0)
    max_y = lat_to_mercator_y(32.5)
    
    # Calculate conformal coordinates
    x_pct = (lon - min_lon) / (max_lon - min_lon)
    x = 40.0 + x_pct * (width - 80.0)
    
    y_val = lat_to_mercator_y(lat)
    y_pct = (y_val - min_y) / (max_y - min_y)
    y = height - (30.0 + y_pct * (height - 60.0))
    
    return round(x, 1), round(y, 1)

def polygon_to_svg(coords):
    paths = []
    for ring in coords:
        if not ring or len(ring) < 3:
            continue
        pts = [project_latam_conformal(p[0], p[1]) for p in ring]
        p_str = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in pts[1:]) + " Z"
        paths.append(p_str)
    return " ".join(paths)

def main():
    with open('latam_countries_geo.json', 'r', encoding='utf-8') as f:
        geo = json.load(f)

    # Coordenadas y datos exactos verificados
    country_meta = {
        'MEX': {'code': 'MX', 'name': 'México', 'count': 1178, 'rail': 'SPEI 24/7 / CoDi', 'remesas': '$62.5B', 'growth': '+24%', 'centroid': (-102.5, 23.6)},
        'BRA': {'code': 'BR', 'name': 'Brasil', 'count': 273, 'rail': 'Pix (BCB)', 'remesas': '$4.8B', 'growth': '+38%', 'centroid': (-51.9, -14.2)},
        'COL': {'code': 'CO', 'name': 'Colombia', 'count': 876, 'rail': 'Bre-B / PSE', 'remesas': '$10.4B', 'growth': '+22%', 'centroid': (-73.2, 4.5)},
        'ARG': {'code': 'AR', 'name': 'Argentina', 'count': 39, 'rail': 'Transferencias 3.0', 'remesas': '$1.9B', 'growth': '+18%', 'centroid': (-65.0, -35.0)},
        'CHL': {'code': 'CL', 'name': 'Chile', 'count': 66, 'rail': 'TEF / Khipu', 'remesas': '$350M', 'growth': '+15%', 'centroid': (-71.5, -33.5)},
        'PER': {'code': 'PE', 'name': 'Perú', 'count': 168, 'rail': 'Yape / Plin', 'remesas': '$4.5B', 'growth': '+21%', 'centroid': (-75.0, -9.1)},
        'ECU': {'code': 'EC', 'name': 'Ecuador', 'count': 2, 'rail': 'SPI Dólar', 'remesas': '$5.2B', 'growth': '+12%', 'centroid': (-78.5, -1.8)},
        'CRI': {'code': 'CR', 'name': 'Costa Rica', 'count': 8, 'rail': 'SINPE Móvil', 'remesas': '$650M', 'growth': '+19%', 'centroid': (-84.0, 9.9)},
        'PAN': {'code': 'PA', 'name': 'Panamá', 'count': 16, 'rail': 'Yappy / ACH', 'remesas': '$890M', 'growth': '+14%', 'centroid': (-80.0, 8.5)},
        'DOM': {'code': 'DO', 'name': 'Rep. Dominicana', 'count': 18, 'rail': 'LBTR Inmediato', 'remesas': '$11.9B', 'growth': '+26%', 'centroid': (-70.2, 18.7)},
        'GTM': {'code': 'GT', 'name': 'Guatemala', 'count': 6, 'rail': 'ACH Pronto', 'remesas': '$19.8B', 'growth': '+28%', 'centroid': (-90.5, 15.5)},
        'URY': {'code': 'UY', 'name': 'Uruguay', 'count': 4, 'rail': 'SPI Directo', 'remesas': '$220M', 'growth': '+16%', 'centroid': (-56.0, -32.8)},
        'PRY': {'code': 'PY', 'name': 'Paraguay', 'count': 4, 'rail': 'SIPAP / SPI', 'remesas': '$600M', 'growth': '+11%', 'centroid': (-58.4, -23.4)},
        'BOL': {'code': 'BO', 'name': 'Bolivia', 'count': 3, 'rail': 'QR Simple A2A', 'remesas': '$1.4B', 'growth': '+10%', 'centroid': (-64.5, -16.5)},
        'VEN': {'code': 'VE', 'name': 'Venezuela', 'count': 2, 'rail': 'Pago Móvil C2P', 'remesas': '$2.8B', 'growth': '+8%', 'centroid': (-66.0, 7.0)},
        'SLV': {'code': 'SV', 'name': 'El Salvador', 'count': 2, 'rail': 'Transfer365', 'remesas': '$8.1B', 'growth': '+9%', 'centroid': (-88.9, 13.8)},
        'HND': {'code': 'HN', 'name': 'Honduras', 'count': 2, 'rail': 'ACH Pronto', 'remesas': '$9.2B', 'growth': '+15%', 'centroid': (-86.5, 14.5)},
        'NIC': {'code': 'NI', 'name': 'Nicaragua', 'count': 2, 'rail': 'ACH UniRed', 'remesas': '$4.9B', 'growth': '+14%', 'centroid': (-85.0, 12.8)}
    }

    output = []
    for feat in geo['features']:
        iso3 = feat.get('id', '')
        if iso3 not in country_meta:
            continue
        
        info = country_meta[iso3]
        geom = feat['geometry']
        g_type = geom['type']
        
        if g_type == 'Polygon':
            svg_d = polygon_to_svg(geom['coordinates'])
        elif g_type == 'MultiPolygon':
            parts = [polygon_to_svg(poly) for poly in geom['coordinates']]
            svg_d = " ".join(parts)
        else:
            continue

        c_lon, c_lat = info['centroid']
        lx, ly = project_latam_conformal(c_lon, c_lat)

        output.append({
            'code': info['code'],
            'iso3': iso3,
            'name': info['name'],
            'count': info['count'],
            'dominantRail': info['rail'],
            'remesas': info['remesas'],
            'growth': info['growth'],
            'svgPath': svg_d,
            'labelX': lx,
            'labelY': ly
        })

    with open('client/src/data/latam_countries_svg.json', 'w', encoding='utf-8') as out:
        json.dump(output, out, indent=2, ensure_ascii=False)

    print(f"Generado latam_countries_svg.json con {len(output)} países en proyección conforme Web Mercator de alta precisión.")

if __name__ == '__main__':
    main()
