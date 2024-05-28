import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../../store/venues/venueSlice";
import VenueHeader from "./components/VenueHeader";
import VenueContent from "./components/VenueContent";
import { Container } from "@mantine/core";

function SpecificVenue() {
  const dispatch = useDispatch();
  const params = useParams();
  const venueId = params.venueId;
  const venue = useSelector((state) => state.venues.selectedVenue);
  const loading = useSelector((state) => state.venues.loading);
  const error = useSelector((state) => state.venues.error);

  useEffect(() => {
    if (venueId) {
      dispatch(fetchVenueById({ id: venueId }));
    }
  }, [dispatch, venueId]);

  if (loading === "loading") {
    return <p>Loading venue...</p>;
  }

  if (error) {
    return <p>Error loading venue: {error}</p>;
  }

  if (!venue) {
    return <p>No venue data!</p>;
  }

  return (
    <>
      <Container size="xl">
        <VenueHeader venue={venue} />
        <VenueContent venue={venue} />
      </Container>
    </>
  );
}

export default SpecificVenue;
