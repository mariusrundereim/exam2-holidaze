import { Grid, Title } from "@mantine/core";
import CustomerBookingCard from "../../components/cards/CustomerBookingCard";
function ListBookings({ bookings }) {
  return (
    <>
      <Title>Your Upcoming booking as </Title>
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

export default ListBookings;
