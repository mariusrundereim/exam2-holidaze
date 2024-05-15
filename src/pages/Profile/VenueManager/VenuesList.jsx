import { Grid, Title, Text } from "@mantine/core";
import ProfileVenuesCard from "../../../components/cards/ProfileVenuesCard";
function VenuesNewList({ venues }) {
  return (
    <>
      {venues.length === 0 ? (
        <Text>No venues</Text>
      ) : (
        <Grid>
          {venues.map((venue) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
              <ProfileVenuesCard venue={venue} venueId={venue.id} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
}

export default VenuesNewList;
