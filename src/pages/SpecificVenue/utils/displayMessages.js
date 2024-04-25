// Venues

// Location

export function addressMessage(location) {
  return location.address ? location.address : "No address";
}

export function cityMessage(location) {
  return location.city ? location.city : "No city";
}

export function countryMessage(location) {
  return location.country ? location.country : "No country";
}

export function continentMessage(location) {
  return location.continent ? location.continent : "No continent";
}

export function zipMessage(location) {
  return location.zip ? location.zip : "No zip";
}

// Meta

export function wifiMessage(meta) {
  return meta.wifi ? "Available" : "Unavailable";
}

export function parkingMessage(meta) {
  return meta.parking ? "Available" : "Unavailable";
}

export function petsMessage(meta) {
  return meta.pets ? "Available" : "Unavailable";
}

export function breakfastMessage(meta) {
  return meta.breakfast ? "Included" : "Not included";
}
