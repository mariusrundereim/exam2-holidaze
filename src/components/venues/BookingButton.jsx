import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/account/isLoggedIn";
import { useSelector } from "react-redux";

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

  const handleClick = () => {
    if (loggedIn) {
      navigate(`/${venueId}/bookings`);
    } else {
      navigate(`/signup`);
    }
  };
  return (
    <>
      <Button onClick={handleClick}>Book this Venue</Button>
    </>
  );
}

export default BookingButton;
