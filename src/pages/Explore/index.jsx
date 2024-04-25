import { useEffect, useState } from "react";
import VenuesCard from "../../components/cards/VenuesCard";
import { Grid, Title, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../../store/venues/venueSlice";
function Explore() {
  const dispatch = useDispatch();
  // const filteredVenues = useSelector((state = state.venues.filteredVenues));
  const venues = useSelector((state) => state.venues.venueList);
  const loading = useSelector((state) => state.venues.loading);
  const error = useSelector((state) => state.venues.error);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]); // Add dispatch to the dependency array

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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

export default Explore;
