import { Grid } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";

function ListVenues({ venues }) {
  return (
    <>
      <h2>List of venues:</h2>
      <Grid>
        {venues.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default ListVenues;
