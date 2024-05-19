import { Grid, Title } from "@mantine/core";
import VenueManagerBookingCard from "../../../components/cards/VenueManagerBookingCard";
function VenueManagerBookings({ bookings }) {
  return (
    <>
      <Title>Venue Manager bookings</Title>
      <Grid>
        {bookings.map((booking) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={booking.id}>
            <VenueManagerBookingCard key={booking.id} booking={booking} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenueManagerBookings;
