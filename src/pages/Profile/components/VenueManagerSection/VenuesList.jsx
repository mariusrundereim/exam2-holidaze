import { Grid, Title } from "@mantine/core";
import ProfileVenuesCard from "../../../../components/cards/ProfileVenuesCard";
function VenuesNewList({ venues }) {
  return (
    <>
      <Title order={3}>Your Venues</Title>
      <Grid>
        {venues.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <ProfileVenuesCard venue={venue} venueId={venue.id} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesNewList;
