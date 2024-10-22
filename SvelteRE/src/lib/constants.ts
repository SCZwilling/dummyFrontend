export const centerLat = 27.609766;
export const centerLong = 75.146754;
export const minLat = 27.547049;
export const maxLat = 27.676979;
export const minLon = 75.061628;
export const maxLon = 75.219426;

export function isWithinTurkeyBounds(latitude: number, longitude: number) {
  return latitude >= minLat && latitude <= maxLat && longitude >= minLon && longitude <= maxLon;
}