import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
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

  const handleClick = () => {
    navigate(`/${venueId}/bookings`);
  };
  return (
    <>
      <Button onClick={handleClick}>Book this Venue</Button>
    </>
  );
}

export default BookingButton;
