import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import ProfileHeader from "./profileHeader";
import VenueManagerSection from "./VenueManager";
import CustomerSection from "./Customer";
import ProfileStatsDisplay from "./Stats";

function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();

  useEffect(() => {
    if (profileName) {
      dispatch(fetchProfileByName(profileName));
    }
  }, [dispatch, profileName]);

  return (
    <>
      <ProfileHeader />
      <ProfileStatsDisplay />
    </>
  );
}

export default ProfilePage;
