import { Grid, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import ProfileVenuesCard from "../../../../components/cards/ProfileVenuesCard";
function BookingHistory() {
  const bookings = useSelector((state) => state.profile.data.bookings);
  console.log("bookings", bookings);

  return (
    <>
      <h2>Your bookings</h2>
      <Grid>
        {bookings.map((booking) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={booking.id}>
            {booking.id} - {booking.created} - {booking.dateFrom} -{" "}
            {booking.dateTo}
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default BookingHistory;
