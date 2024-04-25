import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../../../store/bookings/bookingSlice";
import { useEffect } from "react";
function BookingHistory() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  console.log("booking", booking);

  return (
    <>
      <h2>Booking History</h2>
    </>
  );
}

export default BookingHistory;
