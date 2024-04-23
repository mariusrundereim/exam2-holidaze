import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profiles/profileSlice";
import ProfileHeader from "./ProfileHeader";
import VenueManagerSection from "./components/VenueManagerSection";
import CustomerSection from "./components/CustomerSection";
function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();
  const profile = useSelector((state) => state.profile);
  console.log("profile", profile);

  useEffect(() => {
    dispatch(fetchProfileByName(profileName));
  }, [dispatch, profileName]);

  return (
    <>
      <h1>Profile</h1>
      <ProfileHeader profile={profile} />
      {profile.venueManager ? (
        <VenueManagerSection profile={profile} />
      ) : (
        <CustomerSection profile={profile} />
      )}
    </>
  );
}

export default ProfilePage;
