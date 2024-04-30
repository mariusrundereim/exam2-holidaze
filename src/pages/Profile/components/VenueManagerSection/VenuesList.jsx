import { Grid, Title } from "@mantine/core";
import ProfileVenuesCard from "../../../../components/cards/ProfileVenuesCard";
function VenuesNewList({ venues }) {
  console.log("The array is here", venues);
  return (
    <>
      <Title order={3}>Your Venues</Title>
      <Grid>
        {venues.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <ProfileVenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesNewList;
