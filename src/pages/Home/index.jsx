import { Grid, Title, Text } from "@mantine/core";
import VenuesNationalDay from "./lists/listVenuesByCountry";
import VenuesWithPets from "./lists/listVenuesWithPets";
import VenuesBySmallPrice from "./lists/listVenuesBySmallPrice";
import VenuesByFamilyCity from "./lists/listVenuesByFamilyCity";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchVenues } from "../../store/venues/venueSlice";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);
  return (
    <>
      <Grid>
        <Grid.Col>
          <VenuesByFamilyCity />
        </Grid.Col>
        <Grid.Col my={40}>
          <VenuesWithPets />
        </Grid.Col>
        <Grid.Col my={40}>
          <VenuesNationalDay />
        </Grid.Col>
        <Grid.Col>
          <VenuesBySmallPrice />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Home;
