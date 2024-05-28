import {
  Title,
  Grid,
  Group,
  Text,
  TextInput,
  Slider,
  RangeSlider,
  Radio,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  setPrice,
  setMaxGuests,
  setWifiChecked,
  setPetsChecked,
  setBreakfastChecked,
  setParkingChecked,
} from "../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilterResults } from "../../../store/venues/venueSlice";
function FilterVenues() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.venues.filters);
  const searchResults = useSelector((state) => state.venues.searchVenues);

  const prices = searchResults
    .map((venue) => venue.price)
    .filter((price) => typeof price === "number");
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  useEffect(() => {
    if (filters.price[0] !== minPrice || filters.price[1] !== maxPrice) {
      dispatch(setPrice([minPrice, maxPrice]));
    }
  }, [minPrice, maxPrice, dispatch]);

  // Filter venues based on the filters in the state
  const filteredVenues = searchResults.filter((venue) => {
    if (filters.wifi.checked && venue.meta.wifi !== filters.wifi.value)
      return false;
    if (filters.pets.checked && venue.meta.pets !== filters.pets.value)
      return false;
    if (
      filters.breakfast.checked &&
      venue.meta.breakfast !== filters.breakfast.value
    )
      return false;
    if (filters.parking.checked && venue.meta.parking !== filters.parking.value)
      return false;
    if (venue.price > filters.price[1] || venue.price < filters.price[0])
      return false;
    if (venue.maxGuests > filters.maxGuests) return false;
    return true;
  });

  console.log("Filtered venues::", filteredVenues);

  useEffect(() => {
    dispatch(updateSearchFilterResults(filteredVenues));
  }, [filteredVenues, dispatch]);

  const handleClear = () => {
    dispatch(setPrice([minPrice, maxPrice]));
    dispatch(setMaxGuests(99));
    dispatch(setWifiChecked(false));
    dispatch(setPetsChecked(false));
    dispatch(setBreakfastChecked(false));
    dispatch(setParkingChecked(false));
  };

  const handleFilter = () => {
    //
  };

  return (
    <>
      <Grid gutter={30}>
        <Grid.Col>
          <Text>Search found: {searchResults.length}</Text>
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
          <Button variant="light" onClick={handleFilter}>
            View results
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default FilterVenues;

// import {
//   Title,
//   Grid,
//   Group,
//   Text,
//   TextInput,
//   Slider,
//   Radio,
//   Button,
// } from "@mantine/core";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateSearchFilterResults } from "../../../store/venues/venueSlice";
// import { setFilters, clearFilters } from "../../../store/venues/venueSlice";
// function FilterVenues() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state) => state.venues.filters);
//   const searchResults = useSelector((state) => state.venues.searchVenues);
//   const [price, setPrice] = useState(filters.price);
//   const [maxGuests, setMaxGuests] = useState(filters.maxGuests);
//   const [wifiChecked, setWifiChecked] = useState(filters.wifi);
//   const [petsChecked, setPetsChecked] = useState(filters.pets);
//   const [breakfastChecked, setBreakfastChecked] = useState(filters.breakfast);
//   const [parkingChecked, setParkingChecked] = useState(filters.parking);

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

//   const handleClear = () => {
//     setPrice(1000);
//     setMaxGuests(99);
//     setWifiChecked(false);
//     setPetsChecked(false);
//     setBreakfastChecked(false);
//     setParkingChecked(false);
//     dispatch(clearFilters());
//     // dispatch(updateSearchFilterResults(searchResults));
//   };
//   return (
//     <>
//       <Title>Filter</Title>
//       <Grid>
//         <Grid.Col>Venues found: {searchResults.length}</Grid.Col>
//         <Grid.Col>
//           <Text>Price</Text>
//           <Slider
//             value={price}
//             onChange={setPrice}
//             max={1000}
//             label={(value) => `${value} NOK`}
//           />
//         </Grid.Col>
//         <Grid.Col>
//           <Text>Max guests</Text>
//           <Slider
//             value={maxGuests}
//             onChange={setMaxGuests}
//             max={99}
//             label={(value) => `${value}`}
//           />
//         </Grid.Col>
//         <Grid.Col>
//           <Radio.Group label="Ammenities">
//             <Group>
//               <Radio
//                 label="Wifi"
//                 value="wifi"
//                 checked={wifiChecked}
//                 onChange={() => setWifiChecked(!wifiChecked)}
//               />
//               <Radio
//                 label="Pets"
//                 value="pets"
//                 checked={petsChecked}
//                 onChange={() => setPetsChecked(!petsChecked)}
//               />
//               <Radio
//                 label="Breakfast"
//                 value="breakfast"
//                 checked={breakfastChecked}
//                 onChange={() => setBreakfastChecked(!breakfastChecked)}
//               />
//               <Radio
//                 label="Parking"
//                 value="parking"
//                 checked={parkingChecked}
//                 onChange={() => setParkingChecked(!parkingChecked)}
//               />
//             </Group>
//           </Radio.Group>
//         </Grid.Col>
//         <Grid.Col>
//           <Button variant="default" onClick={handleClear}>
//             Clear
//           </Button>
//           <Button variant="light" onClick={handleFilter}>
//             View results
//           </Button>
//         </Grid.Col>
//       </Grid>
//     </>
//   );
// }

// export default FilterVenues;
