import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsByProfile } from "../../store/profile/profileSlice";
import ListBookings from "./listBookings";

function BookingPage() {
  const dispatch = useDispatch();

  const profileName = useSelector((state) => state.profile.name);
  const yourBookings = useSelector((state) => state.profile.bookings);

  useEffect(() => {
    if (profileName) {
      dispatch(getBookingsByProfile(profileName));
    }
  }, [profileName, dispatch]);
  return <ListBookings bookings={yourBookings} />;
}

export default BookingPage;
