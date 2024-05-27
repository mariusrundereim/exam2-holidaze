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

// import { fetchVenues } from "../venues/venueSlice";

// const venueFilteringMiddleware = (store) => (next) => (action) => {
//   // Check if the action is the result of fetching venues
//   if (action.type === fetchVenues.fulfilled.type && action.payload) {
//     const filteredVenues = action.payload.data.filter((venue) => {
//       // Filter based on missing address and city
//       const hasAddressAndCity =
//         venue.location && venue.location.address && venue.location.city;

//       // Filter based on images
//       const hasImages = venue.media && venue.media.length > 0;

//       return hasAddressAndCity && hasImages;
//     });

//     // Dispatch a new action with the filtered venues
//     store.dispatch({
//       type: "venues/filteredVenuesUpdated",
//       payload: filteredVenues,
//     });
//   }

//   // Let other actions pass through
//   return next(action);
// };

// export default venueFilteringMiddleware;
