import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
function ProfileSettingsAlert() {
  const icon = <IconInfoCircle />;
  return (
    <>
      <Alert
        variant="light"
        color="blue"
        withCloseButton
        title="Alert"
        icon={icon}
      >
        Please delete all your created venue before change the account to
        customer.
      </Alert>
    </>
  );
}

export default ProfileSettingsAlert;
