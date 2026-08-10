import json

def project_latam_mercator(lon, lat, width=1000, height=850):
    # LATAM bounding box: Lon -118 to -34, Lat -56 to 33
    min_lon, max_lon = -118.0, -34.0
    min_lat, max_lat = -56.0, 33.0
    
    x = (lon - min_lon) / (max_lon - min_lon) * (width - 60) + 30
    y = height - ((lat - min_lat) / (max_lat - min_lat) * (height - 60) + 30)
    return round(x, 1), round(y, 1)

def polygon_to_svg(coords):
    paths = []
    for ring in coords:
        if not ring or len(ring) < 3:
            continue
        pts = [project_latam_mercator(p[0], p[1]) for p in ring]
        p_str = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in pts[1:]) + " Z"
        paths.append(p_str)
    return " ".join(paths)

def main():
    with open('latam_countries_geo.json', 'r', encoding='utf-8') as f:
        geo = json.load(f)

    country_meta = {
        'MEX': {'code': 'MX', 'name': 'México', 'count': 1178, 'rail': 'SPEI 24/7 / CoDi', 'remesas': '$62.5B', 'growth': '+24%'},
        'BRA': {'code': 'BR', 'name': 'Brasil', 'count': 273, 'rail': 'Pix (BCB)', 'remesas': '$4.8B', 'growth': '+38%'},
        'COL': {'code': 'CO', 'name': 'Colombia', 'count': 876, 'rail': 'Bre-B / PSE', 'remesas': '$10.4B', 'growth': '+22%'},
        'ARG': {'code': 'AR', 'name': 'Argentina', 'count': 39, 'rail': 'Transferencias 3.0', 'remesas': '$1.9B', 'growth': '+18%'},
        'CHL': {'code': 'CL', 'name': 'Chile', 'count': 66, 'rail': 'TEF / Khipu', 'remesas': '$350M', 'growth': '+15%'},
        'PER': {'code': 'PE', 'name': 'Perú', 'count': 168, 'rail': 'Yape / Plin', 'remesas': '$4.5B', 'growth': '+21%'},
        'ECU': {'code': 'EC', 'name': 'Ecuador', 'count': 2, 'rail': 'SPI Dólar', 'remesas': '$5.2B', 'growth': '+12%'},
        'CRI': {'code': 'CR', 'name': 'Costa Rica', 'count': 8, 'rail': 'SINPE Móvil', 'remesas': '$650M', 'growth': '+19%'},
        'PAN': {'code': 'PA', 'name': 'Panamá', 'count': 16, 'rail': 'Yappy / ACH', 'remesas': '$890M', 'growth': '+14%'},
        'DOM': {'code': 'DO', 'name': 'Rep. Dominicana', 'count': 18, 'rail': 'LBTR Inmediato', 'remesas': '$11.9B', 'growth': '+26%'},
        'GTM': {'code': 'GT', 'name': 'Guatemala', 'count': 6, 'rail': 'ACH Pronto', 'remesas': '$19.8B', 'growth': '+28%'},
        'URY': {'code': 'UY', 'name': 'Uruguay', 'count': 4, 'rail': 'SPI Directo', 'remesas': '$220M', 'growth': '+16%'},
        'PRY': {'code': 'PY', 'name': 'Paraguay', 'count': 4, 'rail': 'SIPAP / SPI', 'remesas': '$600M', 'growth': '+11%'},
        'BOL': {'code': 'BO', 'name': 'Bolivia', 'count': 3, 'rail': 'QR Simple A2A', 'remesas': '$1.4B', 'growth': '+10%'},
        'VEN': {'code': 'VE', 'name': 'Venezuela', 'count': 2, 'rail': 'Pago Móvil C2P', 'remesas': '$2.8B', 'growth': '+8%'},
        'SLV': {'code': 'SV', 'name': 'El Salvador', 'count': 2, 'rail': 'Transfer365', 'remesas': '$8.1B', 'growth': '+9%'},
        'HND': {'code': 'HN', 'name': 'Honduras', 'count': 2, 'rail': 'ACH Pronto', 'remesas': '$9.2B', 'growth': '+15%'},
        'NIC': {'code': 'NI', 'name': 'Nicaragua', 'count': 2, 'rail': 'ACH UniRed', 'remesas': '$4.9B', 'growth': '+14%'}
    }

    output = []
    for feat in geo['features']:
        iso3 = feat.get('id', '')
        if iso3 not in country_meta:
            continue
        
        info = country_meta[iso3]
        geom = feat['geometry']
        g_type = geom['type']
        
        svg_d = ""
        cx, cy, pts_count = 0, 0, 0

        if g_type == 'Polygon':
            svg_d = polygon_to_svg(geom['coordinates'])
            for ring in geom['coordinates']:
                for pt in ring:
                    px, py = project_latam_mercator(pt[0], pt[1])
                    cx += px
                    cy += py
                    pts_count += 1
        elif g_type == 'MultiPolygon':
            parts = []
            for poly in geom['coordinates']:
                parts.append(polygon_to_svg(poly))
                for ring in poly:
                    for pt in ring:
                        px, py = project_latam_mercator(pt[0], pt[1])
                        cx += px
                        cy += py
                        pts_count += 1
            svg_d = " ".join(parts)

        label_x = round(cx / pts_count, 1) if pts_count > 0 else 0
        label_y = round(cy / pts_count, 1) if pts_count > 0 else 0

        # Adjust label positions for tricky geographic centroids
        if info['code'] == 'CL':
            label_x += 15
        elif info['code'] == 'MX':
            label_y += 10
        elif info['code'] == 'AR':
            label_x += 10

        output.append({
            'code': info['code'],
            'iso3': iso3,
            'name': info['name'],
            'count': info['count'],
            'dominantRail': info['rail'],
            'remesas': info['remesas'],
            'growth': info['growth'],
            'svgPath': svg_d,
            'labelX': label_x,
            'labelY': label_y
        })

    output.sort(key=lambda x: x['count'], reverse=True)
    with open('client/src/data/latam_countries_svg.json', 'w', encoding='utf-8') as out:
        json.dump(output, out, ensure_ascii=False, indent=2)

    print(f"Generados {len(output)} países de LATAM con coordenadas SVG reales.")

if __name__ == '__main__':
    main()
