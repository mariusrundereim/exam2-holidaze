import { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenueById } from "../../../store/venues/venueSlice";
import { singleBooking } from "../../../store/bookings/bookingSlice";
import { Title, Grid, Text, Card } from "@mantine/core";

function BookingConfirmed() {
  const { venueId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const venue = useSelector((state) => state.venues.selectedVenue);
  const booking = useSelector((state) => state.booking.selectedBooking);

  console.log("book venue", booking);

  useEffect(() => {
    if (venueId) {
      console.log("Fetching venue by ID:", venueId);
      dispatch(fetchVenueById({ id: venueId }));
    }

    const bookingId = new URLSearchParams(location.search).get("bookingId");
    if (bookingId) {
      console.log("Fetching booking by ID", bookingId);
      dispatch(singleBooking({ id: bookingId }));
    }
  }, [dispatch, venueId, location.search]);

  return (
    <>
      {venue && (
        <div>
          <h2>Venue Details</h2>
          <p>Venue: {venue.name}</p>
          <Text>Owner {venue.owner.name}</Text>
        </div>
      )}
      {/* {booking && (
        <div>
          <h2>Booking Details</h2>
          <p>Customer: {booking.customer.name}</p>
          <p>Booking Date: {booking.date}</p>
        </div>
      )} */}
    </>
  );
}

export default BookingConfirmed;
