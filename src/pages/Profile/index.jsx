import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profiles/profileSlice";
function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();
  const profile = useSelector((state) => state.profile);
  console.log(profile);

  useEffect(() => {
    dispatch(fetchProfileByName(profileName));
  }, [dispatch, profileName]);

  const isLoading = useSelector((state) => state.profile.isLoading); // Add loading state

  if (isLoading) {
    return <div>Loading Profile...</div>;
  }

  const { venueManager } = profile;

  return (
    <>
      <h1>Profile page</h1>
      <h3>{profileName}</h3>
      <h3>I am a venueManager? {venueManager ? "Yes" : "No"}</h3>
    </>
  );
}

export default ProfilePage;
