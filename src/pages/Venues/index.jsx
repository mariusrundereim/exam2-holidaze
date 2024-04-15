import { useState } from "react";
import { useGetVenuesQuery } from "../../store/api/apiSlice";
import VenuesCard from "../../components/cards/VenuesCard";
import { Grid, Title, Text } from "@mantine/core";
function VenuesPage() {
  const [page, setPage] = useState(1);
  const { data: venues, isFetching } = useGetVenuesQuery(page);

  if (isFetching) return <div>Loading...</div>;
  return (
    <>
      <h2>List of all venues</h2>
      <Grid>
        {venues.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
      <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
    </>
  );
}

export default VenuesPage;
