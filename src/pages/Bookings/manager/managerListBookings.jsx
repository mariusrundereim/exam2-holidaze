import { Grid, Title, Text, Card, Container, Button } from "@mantine/core";
import VenueManagerBookingCard from "../../../components/cards/VenueManagerBookingCard";
function VenueManagerBookings({ bookings }) {
  return (
    <>
      <Container>
        <Title order={3} mb={30}>
          Venue Manager Bookings
        </Title>
        <Grid>
          {bookings.map((venue) => (
            <Grid.Col span={{ base: 12 }} key={venue.id}>
              <Card withBorder>
                <Title order={4}>{venue.name}</Title>
                <Text>
                  {venue.location.address} - {venue.location.city}
                </Text>

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
      </Container>
    </>
  );
}

export default VenueManagerBookings;
