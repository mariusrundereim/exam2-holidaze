import { Notification } from "@mantine/core";
import { useState } from "react";

function useNotification() {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const NotificationComponent = () =>
    notification.message ? (
      <Notification onClose={() => setNotification({ message: "", type: "" })}>
        {notification.message}
      </Notification>
    ) : null;

  return { showNotification, NotificationComponent };
}

export default useNotification;
