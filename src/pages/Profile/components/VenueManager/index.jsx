import VenuesList from "./VenuesList";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function VenueManagerSection() {
  const dispatch = useDispatch();
  const venues = useSelector((state) => {
    return state.venues.myCreatedVenues;
  });

  useEffect(() => {
    dispatch(getVenuesByProfile(profile.name));
  }, [dispatch, profile]);
  return (
    <>
      <h2>Venue Manager Section</h2>
      <VenuesList venues={venues} />
    </>
  );
}

export default VenueManagerSection;
