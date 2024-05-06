import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
// import VenuesPage from "../pages/Venues";
import SpecificVenue from "../pages/SpecificVenue";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Signup from "../pages/Signup";
import Explore from "../pages/Explore";
import VenueForm from "../components/forms/VenueForm";
import Profiles from "../pages/Profiles";
import VenuesListPage from "../pages/Venues";
import VenueLayout from "./layout/venueLayout";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/explore" element={<Explore />} /> */}
          {/* <Route path="/venues" element={<VenuesPage />} /> */}
          <Route path="venues" element={<VenueLayout />}>
            <Route index element={<VenuesListPage />} />
            <Route path=":venueId" element={<SpecificVenue />} />
            <Route path="edit/:venueId" element={<VenueForm />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:profileName" element={<ProfilePage />} />
          <Route path="/profiles" element={<Profiles />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
