import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import VenuesPage from "../pages/Venues";
import SpecificVenue from "../pages/SpecificVenue";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Explore from "../pages/Explore";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:venueId" element={<SpecificVenue />} />
          <Route path="/explore" element={<VenuesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
