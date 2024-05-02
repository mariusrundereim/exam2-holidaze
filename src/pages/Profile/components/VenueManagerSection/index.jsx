import VenuesList from "./VenuesList";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function VenueManagerSection({ profile }) {
  const dispatch = useDispatch();
  const venues = useSelector((state) => {
    return state.profile.venuesProfile;
  });

  useEffect(() => {
    if (profile) {
      dispatch(getVenuesByProfile(profile.name));
    }
  }, [dispatch, profile]);
  return (
    <>
      <h2>Venue Manager Section</h2>
      <VenuesList venues={venues} />
    </>
  );
}

export default VenueManagerSection;
