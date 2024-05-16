import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { fetchVenueById } from "./path/to/venueSlice"; // Adjust the import path as necessary
// import { singleBooking } from "./path/to/bookingSlice"; // Adjust the import path as necessary
import { fetchVenueById } from "../../../store/venues/venueSlice";
import { singleBooking } from "../../../store/bookings/bookingSlice";
import { Title } from "@mantine/core";

function BookingConfirmed() {
  const { venueId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const venue = useSelector((state) => state.venues.selectedVenue);
  const booking = useSelector((state) => state.booking.selectedBooking);

  useEffect(() => {
    if (venueId) {
      console.log("Fetching venue by ID:", venueId);
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
        <div>
          <h2>Venue Details</h2>
          <p>Name: {venue.name}</p>
        </div>
      )}
      {booking && (
        <div>
          <h2>Booking Details</h2>
          <p>Customer: {booking.customer.name}</p>
          <p>Booking Date: {booking.date}</p>
        </div>
      )}
    </>
  );
}

export default BookingConfirmed;
