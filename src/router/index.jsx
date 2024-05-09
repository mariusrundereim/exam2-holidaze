import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import SpecificVenue from "../pages/SpecificVenue";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Signup from "../pages/Signup";
import VenueForm from "../components/forms/VenueForm";
import Profiles from "../pages/Profiles";
import VenuesListPage from "../pages/Venues";
import VenueLayout from "./layout/venueLayout";
import CreateVenue from "../pages/create/venue";
import ProfileLayout from "./layout/profileLayout";
import VenueManagerSection from "../pages/Profile/VenueManager";
import ProfileInfoUpdate from "../pages/update/profile";
import BookingPage from "../pages/Bookings";
import BookingForm from "../components/forms/BookingForm";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookings" element={<BookingPage />}>
            <Route index element={<BookingForm />} />
            <Route path="bookings" element={<BookingForm />} />
          </Route>
          <Route path="venues" element={<VenueLayout />}>
            <Route index element={<VenuesListPage />} />
            <Route path=":venueId" element={<SpecificVenue />} />
            <Route path="edit/:venueId" element={<VenueForm />} />
            <Route path="create" element={<CreateVenue />} />
          </Route>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path=":profileName" element={<ProfilePage />} />
            <Route path=":profileName/bookings" element={<BookingPage />} />
            <Route
              path=":profileName/venues"
              element={<VenueManagerSection />}
            />
            <Route
              path=":profileName/settings"
              element={<ProfileInfoUpdate />}
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/profiles" element={<Profiles />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
