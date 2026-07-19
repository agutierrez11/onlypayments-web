// Mapping of country names (as they appear in verified_fintech_gold.json) to their [latitude, longitude]

export const countryCoordinates: Record<string, [number, number]> = {
  "Argentina": [-38.4161, -63.6167],
  "Bolivia": [-16.2902, -63.5887],
  "Brasil": [-14.2350, -51.9253],
  "Brazil": [-14.2350, -51.9253],
  "Chile": [-35.6751, -71.5430],
  "Colombia": [4.5709, -74.2973],
  "Costa Rica": [9.7489, -83.7534],
  "Cuba": [21.5218, -77.7812],
  "Dominican Republic": [18.7357, -70.1627],
  "República Dominicana": [18.7357, -70.1627],
  "Ecuador": [-1.8312, -78.1834],
  "El Salvador": [13.7942, -88.8965],
  "Guatemala": [15.7835, -90.2308],
  "Honduras": [15.2000, -86.2419],
  "Mexico": [23.6345, -102.5528],
  "México": [23.6345, -102.5528],
  "Nicaragua": [12.8654, -85.2072],
  "Panama": [8.5380, -80.7821],
  "Panamá": [8.5380, -80.7821],
  "Paraguay": [-23.4425, -58.4438],
  "Peru": [-9.1900, -75.0152],
  "Perú": [-9.1900, -75.0152],
  "Puerto Rico": [18.2208, -66.5901],
  "Uruguay": [-32.5228, -55.7658],
  "Venezuela": [6.4238, -66.5897],
  "Estados Unidos": [37.0902, -95.7129],
  "US": [37.0902, -95.7129],
  "USA": [37.0902, -95.7129],
  "España": [40.4637, -3.7492],
  "Spain": [40.4637, -3.7492],
  "LatAm / Global": [0.0, -70.0], // Generic point over LATAM
  "Global": [0.0, 0.0], // Equator
  "Desconocido": [0.0, 0.0]
};

// Helpert to get coordinates. Fallbacks to [0, 0] if not found.
export const getCoordinates = (country: string | undefined | null): [number, number] => {
  if (!country) return [0, 0];
  const exactMatch = countryCoordinates[country];
  if (exactMatch) return exactMatch;
  
  // Try partial match
  const normalizedCountry = country.toLowerCase();
  for (const [key, coords] of Object.entries(countryCoordinates)) {
    if (normalizedCountry.includes(key.toLowerCase())) {
      return coords;
    }
  }

  // Default to [0, 0] if country not supported
  return [0, 0];
};
