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
import { updateSearchFilterResults } from "../../../store/venues/venueSlice";
function FilterVenues() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.venues.searchVenues);
  const [price, setPrice] = useState(1000);
  const [maxGuests, setMaxGuests] = useState(99);
  const [wifiChecked, setWifiChecked] = useState(false);
  const [petsChecked, setPetsChecked] = useState(false);
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);

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

  const handleClear = () => {
    setPrice(1000);
    setMaxGuests(99);
    setWifiChecked(false);
    setPetsChecked(false);
    setBreakfastChecked(false);
    setParkingChecked(false);
    dispatch(updateSearchFilterResults(searchResults));
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
