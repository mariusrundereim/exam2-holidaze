import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import ProfileHeader from "./profileHeader";
import { Container } from "@mantine/core";

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
      <Container>
        <ProfileHeader />
      </Container>
    </>
  );
}

export default ProfilePage;
