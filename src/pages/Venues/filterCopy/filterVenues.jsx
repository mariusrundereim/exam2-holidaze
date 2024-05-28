import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import {
  setPrice,
  setMaxGuests,
  setWifiChecked,
  setPetsChecked,
  setBreakfastChecked,
  setParkingChecked,
  updateSearchFilterResults,
  clearFilters,
  clearSearchResults,
} from "../../../store/venues/venueSlice";
import {
  Grid,
  Group,
  Text,
  Slider,
  RangeSlider,
  Radio,
  Button,
} from "@mantine/core";
function FilterVenues() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.venues.filters);
  const searchResults = useSelector((state) => state.venues.searchVenues);
  const loading = useSelector((state) => state.venues.loading);

  // min max price
  const prices = searchResults
    ? searchResults
        .map((venue) => venue.price)
        .filter((price) => typeof price === "number")
    : [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  useEffect(() => {
    if (filters.price[0] !== minPrice || filters.price[1] !== maxPrice) {
      dispatch(setPrice([minPrice, maxPrice]));
    }
  }, [minPrice, maxPrice, filters.price, dispatch]);

  // Filter venues based on the filters in the state

  const filteredVenues = useMemo(() => {
    return searchResults.filter((venue) => {
      const withinPriceRange =
        venue.price >= filters.price[0] && venue.price <= filters.price[1];
      const withinGuestLimit = venue.maxGuests <= filters.maxGuests;
      const matchesWifi =
        !filters.wifi.checked || venue.meta.wifi === filters.wifi.value;
      const matchesPets =
        !filters.pets.checked || venue.meta.pets === filters.pets.value;
      const matchesBreakfast =
        !filters.breakfast.checked ||
        venue.meta.breakfast === filters.breakfast.value;
      const matchesParking =
        !filters.parking.checked ||
        venue.meta.parking === filters.parking.value;
      return (
        withinPriceRange &&
        withinGuestLimit &&
        matchesWifi &&
        matchesPets &&
        matchesBreakfast &&
        matchesParking
      );
    });
  }, [searchResults, filters]);

  // const filteredVenues = searchResults.filter((venue) => {
  //   if (filters.wifi.checked && venue.meta.wifi !== filters.wifi.value)
  //     return false;
  //   if (filters.pets.checked && venue.meta.pets !== filters.pets.value)
  //     return false;
  //   if (
  //     filters.breakfast.checked &&
  //     venue.meta.breakfast !== filters.breakfast.value
  //   )
  //     return false;
  //   if (filters.parking.checked && venue.meta.parking !== filters.parking.value)
  //     return false;
  //   if (venue.price > filters.price[1] || venue.price < filters.price[0])
  //     return false;
  //   if (venue.maxGuests > filters.maxGuests) return false;
  //   return true;
  // });

  // Debounce dispatch

  const debounceUpdateSearchFilterResults = useCallback(
    debounce((filteredVenues) => {
      dispatch(updateSearchFilterResults(filteredVenues));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debounceUpdateSearchFilterResults(filteredVenues);
  }, [filteredVenues, debounceUpdateSearchFilterResults]);

  // console.log("Filtered venues::", filteredVenues);

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(clearSearchResults());
  };

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid gutter={30}>
        <Grid.Col>
          <Text>Search found: {searchResults ? searchResults.length : 0}</Text>
          <Text>Filtered found: {filteredVenues.length}</Text>
        </Grid.Col>
        <Grid.Col>
          <Text>Price</Text>
          <RangeSlider
            min={minPrice}
            max={maxPrice}
            value={filters.price}
            onChange={(value) => dispatch(setPrice(value))}
            label={(value) => `${value.toFixed(2)} NOK`}
          />
        </Grid.Col>
        <Grid.Col>
          <Text>Max guests</Text>
          <Slider
            value={filters.maxGuests}
            onChange={(value) => dispatch(setMaxGuests(value))}
            max={99}
            label={(value) => `${value}`}
          />
        </Grid.Col>
        <Grid.Col>
          <Group>
            <Radio
              label="Wifi"
              value="wifi"
              checked={filters.wifi.checked}
              onChange={() => dispatch(setWifiChecked(!filters.wifi.checked))}
            />
            <Radio
              label="Pets"
              value="pets"
              checked={filters.pets.checked}
              onChange={() => dispatch(setPetsChecked(!filters.pets.checked))}
            />
            <Radio
              label="Breakfast"
              value="breakfast"
              checked={filters.breakfast.checked}
              onChange={() =>
                dispatch(setBreakfastChecked(!filters.breakfast.checked))
              }
            />
            <Radio
              label="Parking"
              value="parking"
              checked={filters.parking.checked}
              onChange={() =>
                dispatch(setParkingChecked(!filters.parking.checked))
              }
            />
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Button variant="default" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="light">View results</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default FilterVenues;
