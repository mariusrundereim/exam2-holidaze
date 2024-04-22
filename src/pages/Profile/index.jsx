import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profiles/profileSlice";
function ProfilePage() {
  const dispatch = useDispatch();
  const { profileName } = useParams();

  useEffect(() => {
    dispatch(fetchProfileByName(profileName));
  }, [dispatch, profileName]);

  return (
    <>
      <h1>Profile page</h1>
      <h3>{profileName}</h3>

      <h3>I am a venueManager?</h3>
      {/* receice the state from the profile slice */}
    </>
  );
}

export default ProfilePage;
