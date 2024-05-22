import { createSelectorHook } from "react-redux";
const selectedSearchVenues = (state) => state.venues.searchVenues;
const selectFilters = (state) => state.venues.filters;

export const selectFilteredVenues = createSelectorHook(
  [selectedSearchVenues, selectFilters],
  (searchVenues, filters) => {
    return searchVenues.filter((venue) => {
      const matchesPrice = venue.price <= filters.price;
      const matchesGuests = venue.maxGuests <= filters.maxGuests;
      const matchesWifi = !filters.wifi || venue.meta.wifi;
      const matchesPets = !filters.pets || venue.meta.pets;
      const matchesBreakfast = !filters.breakfast || venue.meta.breakfast;
      const matchesParking = !filters.parking || venue.meta.parking;

      return (
        matchesPrice &&
        matchesGuests &&
        matchesWifi &&
        matchesPets &&
        matchesBreakfast &&
        matchesParking
      );
    });
  }
);
