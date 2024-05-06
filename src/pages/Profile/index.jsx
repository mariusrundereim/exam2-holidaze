import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import { resetProfileData } from "../../store/profile/profileSlice";
import ProfileHeader from "./ProfileHeader";
import VenueManagerSection from "./components/VenueManagerSection";
import CustomerSection from "./components/CustomerSection";
function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();
  const profile = useSelector((state) =>
    profileName === "user" ? state.user : state.profile[profileName]
  );

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfileByName(profileName));
    }
  }, [dispatch, profileName, profile]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <h1>Your user</h1>
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
