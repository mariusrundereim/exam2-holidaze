import { useEffect, useState } from "react";
import VenuesCard from "../../components/cards/VenuesCard";
import { Grid, Title, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../../store/venues/venueSlice";
import filterValidVenues from "../../utils/venues/filterVenues";
function Explore() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);
  const error = useSelector((state) => state.venues.error);

  const filteredVenues = useSelector((state) => {
    const allVenues = state.venues.venueList;
    return filterValidVenues(allVenues);
  });

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

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
        {filteredVenues.map((venue) => (
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
