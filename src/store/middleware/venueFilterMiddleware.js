import { fetchVenues } from "../venues/venueSlice";

const venueFilteringMiddleware = (store) => (next) => (action) => {
  // Check if the action is the result of fetching venues
  if (action.type === fetchVenues.fulfilled.type) {
    const filteredVenues = action.payload.data.filter((venue) => {
      // Filter based on missing address and city
      const hasAddressAndCity =
        venue.location && venue.location.address && venue.location.city;

      // Filter based on images
      const hasImages = venue.media && venue.media.length > 0;

      return hasAddressAndCity && hasImages;
    });

    // Dispatch a new action with the filtered venues
    store.dispatch({
      type: "venues/filteredVenuesUpdated",
      payload: filteredVenues,
    });
  }

  // Let other actions pass through
  return next(action);
};

export default venueFilteringMiddleware;
