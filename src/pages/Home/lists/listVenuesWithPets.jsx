import VenuesCard from "../../../components/cards/VenuesCard";
import { useSelector } from "react-redux";
import { Grid, Title } from "@mantine/core";
import VenueSkeleton from "../../../components/ui/skeleton";
const filterVenuesByPetsAllowed = (venues, allowPets) => {
  return venues.filter((venue) => venue.meta.pets === allowPets);
};

function VenuesWithPets() {
  const loading = useSelector((state) => state.venues.loading);
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  const venuesPets = filterVenuesByPetsAllowed(allVenuesList, true);

  if (loading === "loading") {
    return <VenueSkeleton />;
  }

  return (
    <Grid>
      <Grid.Col>
        <Title order={3}>Pets</Title>
      </Grid.Col>

      {venuesPets.map((venue) => (
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
          <VenuesCard venue={venue} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default VenuesWithPets;
