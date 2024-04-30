import VenuesNewList from "./VenuesNewList";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function VenueManagerSection({ profile }) {
  const dispatch = useDispatch();
  const venues = useSelector((state) => {
    console.log("Current state profile:", state.profile);
    return state.profile.venueIds;
  });

  useEffect(() => {
    if (profile) {
      dispatch(getVenuesByProfile(profile.name))
        .then((fetchedVenues) => {
          console.log("Fetched Venues:", fetchedVenues);
        })
        .catch((error) => {
          console.error("Error fetching venues:", error);
        });
    }
  }, [dispatch, profile, venues]);
  return (
    <>
      <h2>Venue Manager Section</h2>
      {/* <VenueList /> */}
      <VenuesNewList venues={venues} />
    </>
  );
}

export default VenueManagerSection;
