import { Grid, Title } from "@mantine/core";
import VenuesCard from "../../components/cards/VenuesCard";
function ListBookings({ bookings }) {
  console.log("aa", bookings.data);

  return (
    <>
      <Title>Bookings</Title>
      <Grid>
        {bookings.map((booking) => (
          <Grid.Col key={booking.id}>{booking.id}</Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default ListBookings;
