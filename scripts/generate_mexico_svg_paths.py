import json
import math

def project_mercator(lon, lat, width=1000, height=650):
    # Mexico bounding box: Lon -118 to -86, Lat 14 to 33
    min_lon, max_lon = -118.0, -86.0
    min_lat, max_lat = 14.2, 33.0
    
    x = (lon - min_lon) / (max_lon - min_lon) * (width - 80) + 40
    # Invert Y for SVG coordinates
    y = height - ((lat - min_lat) / (max_lat - min_lat) * (height - 80) + 40)
    return round(x, 1), round(y, 1)

def polygon_to_svg_path(coords):
    paths = []
    for ring in coords:
        if not ring or len(ring) < 3:
            continue
        pts = [project_mercator(pt[0], pt[1]) for pt in ring]
        p_str = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in pts[1:]) + " Z"
        paths.append(p_str)
    return " ".join(paths)

def main():
    with open('mexico_states_geo.json', 'r', encoding='utf-8') as f:
        geo = json.load(f)

    # State counts & metadata from our master fintech dataset
    state_counts = {
        'Distrito Federal': 780,
        'Ciudad de México': 780,
        'Jalisco': 240,
        'Nuevo León': 195,
        'México': 115,
        'Quintana Roo': 45,
        'Querétaro': 38,
        'Puebla': 32,
        'Yucatán': 28,
        'Baja California': 24,
        'Chihuahua': 19,
        'Sonora': 18,
        'Guanajuato': 17,
        'Coahuila': 16,
        'Veracruz': 15,
        'Sinaloa': 14,
        'Aguascalientes': 12,
        'San Luis Potosí': 11,
        'Michoacán': 10,
        'Tamaulipas': 9,
        'Morelos': 8,
        'Hidalgo': 8,
        'Oaxaca': 7,
        'Chiapas': 6,
        'Baja California Sur': 5,
        'Durango': 5,
        'Zacatecas': 4,
        'Colima': 4,
        'Tabasco': 4,
        'Nayarit': 3,
        'Guerrero': 3,
        'Campeche': 2,
        'Tlaxcala': 2
    }

    state_codes = {
        'Distrito Federal': 'CDMX',
        'Ciudad de México': 'CDMX',
        'Jalisco': 'JAL',
        'Nuevo León': 'NL',
        'México': 'MEX',
        'Quintana Roo': 'QROO',
        'Querétaro': 'QRO',
        'Puebla': 'PUE',
        'Yucatán': 'YUC',
        'Baja California': 'BC',
        'Chihuahua': 'CHIH',
        'Sonora': 'SON',
        'Guanajuato': 'GTO',
        'Coahuila': 'COAH',
        'Veracruz': 'VER',
        'Sinaloa': 'SIN',
        'Aguascalientes': 'AGS',
        'San Luis Potosí': 'SLP',
        'Michoacán': 'MICH',
        'Tamaulipas': 'TAM',
        'Morelos': 'MOR',
        'Hidalgo': 'HGO',
        'Oaxaca': 'OAX',
        'Chiapas': 'CHIS',
        'Baja California Sur': 'BCS',
        'Durango': 'DUR',
        'Zacatecas': 'ZAC',
        'Colima': 'COL',
        'Tabasco': 'TAB',
        'Nayarit': 'NAY',
        'Guerrero': 'GRO',
        'Campeche': 'CAMP',
        'Tlaxcala': 'TLAX'
    }

    state_hubs = {
        'Distrito Federal': 'Polanco / Juárez / Santa Fe',
        'Ciudad de México': 'Polanco / Juárez / Santa Fe',
        'Jalisco': 'Guadalajara / Zapopan Tech Zone',
        'Nuevo León': 'San Pedro Garza García / Monterrey',
        'México': 'Naucalpan / Huixquilucan',
        'Quintana Roo': 'Cancún / Riviera Maya / Playa del Carmen',
        'Querétaro': 'Querétaro Innovation Hub',
        'Puebla': 'Angelópolis / Cholula',
        'Yucatán': 'Mérida Hub Sureste',
        'Baja California': 'Tijuana / Mexicali Border Tech'
    }

    output_states = []

    for feat in geo['features']:
        name = feat['properties'].get('state_name', '')
        if name == 'Distrito Federal':
            display_name = 'Ciudad de México'
        else:
            display_name = name
        
        geom = feat['geometry']
        geom_type = geom['type']
        
        svg_d = ""
        center_x, center_y = 0, 0
        point_count = 0

        if geom_type == 'Polygon':
            svg_d = polygon_to_svg_path(geom['coordinates'])
            for ring in geom['coordinates']:
                for pt in ring:
                    px, py = project_mercator(pt[0], pt[1])
                    center_x += px
                    center_y += py
                    point_count += 1
        elif geom_type == 'MultiPolygon':
            poly_paths = []
            for poly in geom['coordinates']:
                poly_paths.append(polygon_to_svg_path(poly))
                for ring in poly:
                    for pt in ring:
                        px, py = project_mercator(pt[0], pt[1])
                        center_x += px
                        center_y += py
                        point_count += 1
            svg_d = " ".join(poly_paths)

        if point_count > 0:
            center_x = round(center_x / point_count, 1)
            center_y = round(center_y / point_count, 1)

        code = state_codes.get(name, state_codes.get(display_name, name[:3].upper()))
        count = state_counts.get(name, state_counts.get(display_name, 5))
        hub = state_hubs.get(name, state_hubs.get(display_name, f'{display_name} Central'))

        output_states.append({
            'id': code.lower(),
            'name': display_name,
            'code': code,
            'count': count,
            'hubCity': hub,
            'topRails': ['SPEI 24/7', 'Tarjetas 3DS'] if count < 100 else ['SPEI 24/7', 'CoDi', 'Dimo', 'Tarjetas 3DS', 'Open Finance'],
            'svgPath': svg_d,
            'labelX': center_x,
            'labelY': center_y
        })

    # Sort by count descending
    output_states.sort(key=lambda x: x['count'], reverse=True)

    print(f"Generados {len(output_states)} estados con coordenadas SVG de alta precisión.")
    
    with open('client/src/data/mexico_states_svg.json', 'w', encoding='utf-8') as out:
        json.dump(output_states, out, ensure_ascii=False, indent=2)

    print("Guardado exitosamente en client/src/data/mexico_states_svg.json")

if __name__ == '__main__':
    main()
