import VenuesNewList from "./VenuesNewList";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function VenueManagerSection({ profile }) {
  const dispatch = useDispatch();
  const venues = useSelector((state) => {
    return state.profile.venueIds;
  });

  useEffect(() => {
    if (profile) {
      dispatch(getVenuesByProfile(profile.name));
    }
  }, [dispatch, profile]);
  return (
    <>
      <h2>Venue Manager Section</h2>
      {/* <VenueList /> */}
      <VenuesNewList venues={venues} />
    </>
  );
}

export default VenueManagerSection;
