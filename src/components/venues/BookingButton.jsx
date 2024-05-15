import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
function BookingButton({ venueId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${venueId}/bookings`);
  };
  return (
    <>
      <Button onClick={handleClick}>Book Me!</Button>
    </>
  );
}

export default BookingButton;
