import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Title } from "@mantine/core";
import { fetchVenueById } from "../../../store/venues/venueSlice";
function VenueConfirmed() {
  const { venueId } = useParams();
  const dispatch = useDispatch();

  const venue = useSelector((state) => state.venues.selectedVenue);

  useEffect(() => {
    if (venueId) {
      dispatch(fetchVenueById({ id: venueId }));
    }
  }, [dispatch, venueId]);
  return (
    <>
      <Title>Venue is created!</Title>
      {venue && (
        <div>
          <h2>Venue Details</h2>
          <p>Name: {venue.name}</p>
        </div>
      )}
    </>
  );
}

export default VenueConfirmed;
