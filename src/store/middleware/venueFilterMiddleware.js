const venueFilterMiddleware = (store) => (next) => (action) => {
  if (action.type === "venues/fetchVenues/fulfilled") {
    const whitelist = store.getState().profiles.whitelist;
    const filteredVenues = action.payload.data.filter((venue) =>
      whitelist.includes(venue.owner.name)
    );
    action.payload.data = filteredVenues;
  }
  return next(action);
};

export default venueFilterMiddleware;
