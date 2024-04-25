function filterValidVenues(venues) {
  return venues.filter(
    (venue) => venue.location.address && venue.location.city
  );
}

export default filterValidVenues;
