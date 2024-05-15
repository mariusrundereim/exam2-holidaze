import { Grid, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchVenueById } from "../../../store/venues/venueSlice";
import { singleBooking } from "../../../store/bookings/bookingSlice";
function BookingConfirmed() {
  const { venueId } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const venue = useSelector((state) => state.venues.selectedVenue);
  const booking = useSelector((state) => state.booking.selectedBooking);

  useEffect(() => {
    if (venueId) {
      dispatch(fetchVenueById({ id: venueId }));
    }

    const bookingId = new URLSearchParams(location.search).get("bookingId");
    if (bookingId) {
      dispatch(singleBooking({ id: bookingId }));
    }
  }, [dispatch, venueId, location.search]);

  return (
    <>
      <Title>Success!</Title>
      {venue && (
        <Grid>
          <Grid.Col>
            <Title>Venue Details</Title>
          </Grid.Col>
        </Grid>
      )}
      {booking && (
        <div>
          <h2>Booking Details</h2>
        </div>
      )}
    </>
  );
}

export default BookingConfirmed;
