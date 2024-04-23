import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVenuesByProfile } from "../../store/profiles/profileSlice";
function VenuesByProfile() {
  const dispatch = useDispatch();
  const { profileName } = useParams();
  const profile = useSelector((state) => state.profile);
  const venues = useSelector((state) => state.profile.venues);
  console.log("profile", profile);
  console.log("venues by profile", venues);

  useEffect(() => {
    dispatch(getVenuesByProfile(profileName));
  }, [dispatch, profileName]);

  return (
    <>
      <h3>Venues by profile</h3>
    </>
  );
}

export default VenuesByProfile;
