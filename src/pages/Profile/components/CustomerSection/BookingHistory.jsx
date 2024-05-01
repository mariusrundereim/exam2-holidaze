import { Grid, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import CustomerBookingCard from "../../../../components/cards/CustomerBookingCard";
function BookingHistory() {
  const bookings = useSelector((state) => state.profile.data.bookings);
  console.log("bookings", bookings);

  console.log("bookings length", bookings.length);
  const bookingsAmount = bookings.length;

  return (
    <>
      <h2>Upcoming bookings ({bookingsAmount})</h2>
      <Grid>
        {bookings.map((booking) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={booking.id}>
            <CustomerBookingCard venue={booking} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default BookingHistory;
