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
  clearFilteredVenues,
} from "../../store/venues/venueSlice";

import {
  Card,
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

  // Initialize price filter
  useEffect(() => {
    if (filters.price[0] < minPrice || filters.price[1] > maxPrice) {
      dispatch(setPrice([minPrice, maxPrice]));
    }
  }, [minPrice, maxPrice, filters.price, dispatch]);

  // Filter venues based on the filters in the state

  const filteredVenues = useMemo(() => {
    if (!searchResults) return [];
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

  // Debounce dispatch

  const debounceFilterResults = useCallback(
    debounce((filteredVenues) => {
      dispatch(updateSearchFilterResults(filteredVenues));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debounceFilterResults(filteredVenues);
  }, [filteredVenues, debounceFilterResults]);

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(clearSearchResults());
    dispatch(clearFilteredVenues());
  };

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid gutter={30}>
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
          <Card withBorder>
            <Card.Section p={"sm"}>
              <Text>Venues:</Text>
              <Text fw={700}>{searchResults ? searchResults.length : 0}</Text>
            </Card.Section>
            <Card.Section p={"sm"}>
              <Text>Filtered found:</Text>
              <Text fw={700}>{filteredVenues.length}</Text>
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Button variant="default" onClick={handleClear}>
            Reset venues ({filteredVenues.length})
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default FilterVenues;
