import VenuesCard from "../../../components/cards/VenuesCard";
import { useSelector } from "react-redux";
import { Grid, Title, Text, Chip, Group } from "@mantine/core";
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
        <Title order={3}>Pet-Friendly Places</Title>
        <Text>Welcoming venues for you and your pets</Text>
      </Grid.Col>
      <Grid.Col>
        <Chip defaultChecked size="xs" radius="sm">
          Pets
        </Chip>
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
