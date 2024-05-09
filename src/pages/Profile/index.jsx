import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import ProfileHeader from "./profileHeader";
import VenueManagerSection from "./VenueManager";
import CustomerSection from "./Customer";

function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();

  useEffect(() => {
    dispatch(fetchProfileByName(profileName));
  }, [dispatch]);

  return (
    <>
      <ProfileHeader />
    </>
  );
}

export default ProfilePage;
