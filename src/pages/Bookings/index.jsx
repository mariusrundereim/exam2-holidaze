import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsByProfile } from "../../store/profile/profileSlice";
import CustomerListBookings from "./customer/listBookings";
import { getVenuesByProfile } from "../../store/venues/venueSlice";
import VenueManagerBookings from "./manager/managerListBookings";

function BookingPage() {
  const dispatch = useDispatch();

  const profileName = useSelector((state) => state.profile.name);
  const venueManager = useSelector((state) => state.profile.venueManager);
  const yourBookings = useSelector((state) => state.profile.bookings);
  const venueBookings = useSelector((state) => state.venues.myCreatedVenues);

  useEffect(() => {
    if (profileName) {
      if (venueManager) {
        dispatch(getVenuesByProfile(profileName));
      } else {
        dispatch(getBookingsByProfile(profileName));
      }
    }
  }, [profileName, venueManager, dispatch]);

  if (venueManager) {
    return <VenueManagerBookings bookings={venueBookings} />;
  }
  return <CustomerListBookings bookings={yourBookings} />;
}

export default BookingPage;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBookingsByProfile } from "../../store/profile/profileSlice";
// import ListBookings from "./listBookings";

// function BookingPage() {
//   const dispatch = useDispatch();

//   const profileName = useSelector((state) => state.profile.name);
//   const yourBookings = useSelector((state) => state.profile.bookings);

//   useEffect(() => {
//     if (profileName) {
//       dispatch(getBookingsByProfile(profileName));
//     }
//   }, [profileName, dispatch]);
//   return <ListBookings bookings={yourBookings} />;
// }

// export default BookingPage;
