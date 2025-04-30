import ProfileUpdateForm from "../../../components/forms/ProfileUpdateForm";
import { Container } from "@mantine/core";
function ProfileInfoUpdate() {
  return (
    <>
      <Container>
        <h2>Settings</h2>
        <ProfileUpdateForm />
      </Container>
    </>
  );
}

export default ProfileInfoUpdate;
