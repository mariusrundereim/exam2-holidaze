import { Grid, Title, Text, Card } from "@mantine/core";
import VenueManagerBookingCard from "../../../components/cards/VenueManagerBookingCard";
function VenueManagerBookings({ bookings }) {
  return (
    <>
      <Title>Venue Manager Bookings</Title>
      <Grid>
        {bookings.map((venue) => (
          <Grid.Col span={{ base: 12 }} key={venue.id}>
            <Card shadow="sm" p="lg" withBorder>
              <Title order={3}>{venue.name}</Title>

              {venue.bookings.length > 0 ? (
                <Grid mt="md">
                  {venue.bookings.map((booking) => (
                    <Grid.Col span={12} key={booking.id}>
                      <VenueManagerBookingCard booking={booking} />
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
                <Text mt="md">No booking yet!</Text>
              )}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenueManagerBookings;
