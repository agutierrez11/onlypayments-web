import json
import math
import random

def is_point_in_polygon(x, y, poly):
    n = len(poly)
    inside = False
    p1x, p1y = poly[0]
    for i in range(n + 1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

def is_point_in_multipolygon(lon, lat, coords):
    for poly in coords:
        if poly and is_point_in_polygon(lon, lat, poly[0]):
            return True
    return False

def main():
    try:
        with open('latam_countries_geo.json', 'r', encoding='utf-8') as f:
            latam_geo = json.load(f)
    except:
        latam_geo = {'features': []}

    # Generate dense points across LATAM and Americas
    land_points = []

    # 1. High-density grid sampling across LATAM (Lon -118 to -34, Lat -56 to 33)
    step = 1.2
    for lat_i in range(int(-55 / step), int(33 / step)):
        lat = lat_i * step
        for lon_i in range(int(-118 / step), int(-34 / step)):
            lon = lon_i * step
            
            is_land = False
            for feat in latam_geo['features']:
                geom = feat['geometry']
                if geom['type'] == 'Polygon':
                    if is_point_in_polygon(lon, lat, geom['coordinates'][0]):
                        is_land = True
                        break
                elif geom['type'] == 'MultiPolygon':
                    if is_point_in_multipolygon(lon, lat, geom['coordinates']):
                        is_land = True
                        break
            
            if is_land:
                # Add slight random jitter for natural look
                j_lat = round(lat + random.uniform(-0.2, 0.2), 2)
                j_lon = round(lon + random.uniform(-0.2, 0.2), 2)
                land_points.append([j_lat, j_lon])

    print(f"Generados {len(land_points)} puntos de tierra para el Globo Holográfico 3D.")
    
    with open('client/src/data/globe_land_points.json', 'w', encoding='utf-8') as out:
        json.dump(land_points, out)

if __name__ == '__main__':
    main()
