import { useDispatch, useSelector } from "react-redux";
// import { getVenuesByProfile } from "../../../../store/profiles/profileSlice";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function VenueList() {
  const dispatch = useDispatch();
  const { profileName } = useParams();
  const venues = useSelector((state) => state.venues);

  // Convert venues into an array
  // const venues = Object.values(profileData).filter(
  //   (item) => typeof item === "object"
  // );

  console.log("test", venues);

  useEffect(() => {
    dispatch(getVenuesByProfile(profileName));
  }, [dispatch, profileName]);

  return (
    <>
      <h3>Venue List</h3>
      {/* {venues.length > 0 ? (
        <ul>
          {venues.map((venue) => (
            <li key={venue._id}>{venue ? venue.name : "Loading..."}</li>
          ))}
        </ul>
      ) : (
        <p>No venues found for this profile.</p>
      )} */}
    </>
  );
}

export default VenueList;
