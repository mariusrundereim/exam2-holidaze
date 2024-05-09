import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
function BookingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bookings`);
  };
  return (
    <>
      <Button onClick={handleClick}>Book Me!</Button>
    </>
  );
}

export default BookingButton;
