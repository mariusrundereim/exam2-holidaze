import {
  Title,
  Grid,
  Group,
  Text,
  TextInput,
  Slider,
  Radio,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateSearchFilterResults } from "../../../store/venues/venueSlice";
import { setFilters, clearFilters } from "../../../store/venues/venueSlice";
function FilterVenues() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.venues.filters);
  const searchResults = useSelector((state) => state.venues.searchVenues);
  const [price, setPrice] = useState(filters.price);
  const [maxGuests, setMaxGuests] = useState(filters.maxGuests);
  const [wifiChecked, setWifiChecked] = useState(filters.wifi);
  const [petsChecked, setPetsChecked] = useState(filters.pets);
  const [breakfastChecked, setBreakfastChecked] = useState(filters.breakfast);
  const [parkingChecked, setParkingChecked] = useState(filters.parking);

  const handleFilter = () => {
    const filteredResults = searchResults.filter((venue) => {
      const matchesPrice = venue.price <= price;
      const matchesGuests = venue.maxGuests <= maxGuests;
      const matchesWifi = !wifiChecked || venue.meta.wifi;
      const matchesPets = !petsChecked || venue.meta.pets;
      const matchesBreakfast = !breakfastChecked || venue.meta.breakfast;
      const matchesParking = !parkingChecked || venue.meta.parking;

      return (
        matchesPrice &&
        matchesGuests &&
        matchesWifi &&
        matchesPets &&
        matchesBreakfast &&
        matchesParking
      );
    });

    dispatch(updateSearchFilterResults(filteredResults));
  };

  //   const handleFilter = () => {
  //     const filteredResults = searchResults.filter((venue) => {
  //       const matchesPrice = venue.price <= price;
  //       const matchesGuests = venue.maxGuests <= maxGuests;
  //       const matchesWifi = !wifiChecked || venue.meta.wifi;
  //       const matchesPets = !petsChecked || venue.meta.pets;
  //       const matchesBreakfast = !breakfastChecked || venue.meta.breakfast;
  //       const matchesParking = !parkingChecked || venue.meta.parking;

  //       return (
  //         matchesPrice &&
  //         matchesGuests &&
  //         matchesWifi &&
  //         matchesPets &&
  //         matchesBreakfast &&
  //         matchesParking
  //       );
  //     });
  //     dispatch(updateSearchFilterResults(filteredResults));
  //   };

  const handleClear = () => {
    setPrice(1000);
    setMaxGuests(99);
    setWifiChecked(false);
    setPetsChecked(false);
    setBreakfastChecked(false);
    setParkingChecked(false);
    dispatch(clearFilters());
    // dispatch(updateSearchFilterResults(searchResults));
  };
  return (
    <>
      <Title>Filter</Title>
      <Grid>
        <Grid.Col>Venues found: {searchResults.length}</Grid.Col>
        <Grid.Col>
          <Text>Price</Text>
          <Slider
            value={price}
            onChange={setPrice}
            max={1000}
            label={(value) => `${value} NOK`}
          />
        </Grid.Col>
        <Grid.Col>
          <Text>Max guests</Text>
          <Slider
            value={maxGuests}
            onChange={setMaxGuests}
            max={99}
            label={(value) => `${value}`}
          />
        </Grid.Col>
        <Grid.Col>
          <Radio.Group label="Ammenities">
            <Group>
              <Radio
                label="Wifi"
                value="wifi"
                checked={wifiChecked}
                onChange={() => setWifiChecked(!wifiChecked)}
              />
              <Radio
                label="Pets"
                value="pets"
                checked={petsChecked}
                onChange={() => setPetsChecked(!petsChecked)}
              />
              <Radio
                label="Breakfast"
                value="breakfast"
                checked={breakfastChecked}
                onChange={() => setBreakfastChecked(!breakfastChecked)}
              />
              <Radio
                label="Parking"
                value="parking"
                checked={parkingChecked}
                onChange={() => setParkingChecked(!parkingChecked)}
              />
            </Group>
          </Radio.Group>
        </Grid.Col>
        <Grid.Col>
          <Button variant="default" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="light" onClick={handleFilter}>
            View results
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default FilterVenues;
