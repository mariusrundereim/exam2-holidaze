import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import VenuesPage from "../pages/Venues";
import SpecificVenue from "../pages/SpecificVenue";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Signup from "../pages/Signup";
import Explore from "../pages/Explore";
import VenueForm from "../components/forms/VenueForm";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venues/:venueId" element={<SpecificVenue />} />
          <Route path="/venues/edit/:venueId" element={<VenueForm />} />
          <Route path="/profile/:profileName" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
