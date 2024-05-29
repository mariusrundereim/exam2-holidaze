import { Button, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/account/isLoggedIn";
import { useSelector } from "react-redux";
import useNotification from "../ui/Notification";
/**
 * Renders a button component for booking a venue.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.venueId - The ID of the venue.
 * @returns {JSX.Element} The rendered BookingButton component.
 */
function BookingButton({ venueId }) {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => isLoggedIn(state));
  const { showNotification, NotificationComponent } = useNotification();

  const handleClick = () => {
    if (loggedIn) {
      navigate(`/${venueId}/bookings`);
    } else {
      showNotification("You must be logged in to book a venue", "error");
    }
  };
  return (
    <>
      <Button onClick={handleClick}>Book this Venue</Button>
      <NotificationComponent />
    </>
  );
}

export default BookingButton;
