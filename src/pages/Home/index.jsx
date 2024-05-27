import { Grid, Title, Text } from "@mantine/core";
import VenuesInSweden from "./lists/listVenuesInSweden";
import VenuesWithPets from "./lists/listVenuesWithPets";
import VenuesBySmallPrice from "./lists/listVenuesBySmallPrice";
import VenuesByFamilyCity from "./lists/listVenuesByFamilyCity";
import VenueSkeleton from "../../components/ui/skeleton";
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
      <Grid gutter={"xl"}>
        <Grid.Col>
          <VenuesInSweden />
        </Grid.Col>
        <Grid.Col>
          <VenuesWithPets />
        </Grid.Col>
        <Grid.Col>
          <VenuesBySmallPrice />
        </Grid.Col>
        <Grid.Col>
          <VenuesByFamilyCity />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Home;
