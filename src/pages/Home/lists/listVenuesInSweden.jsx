import { Grid, Title } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";
import { useSelector } from "react-redux";

const filterVenuesByCountry = (venues, country) => {
  return venues.filter((venue) => venue.location.country === country);
};

function VenuesInSweden() {
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  const venuesInSweden = filterVenuesByCountry(allVenuesList, "Sweden");

  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={3}>Take a vacation in Sweden</Title>
        </Grid.Col>

        {venuesInSweden.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesInSweden;
