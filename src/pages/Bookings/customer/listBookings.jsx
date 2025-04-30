import { Grid, Title, Text, Loader, Center } from "@mantine/core";
import CustomerBookingCard from "../../../components/cards/CustomerBookingCard";
import { useSelector } from "react-redux";

function CustomerListBookings({ bookings }) {
  const loading = useSelector((state) => state.booking.loading);

  if (loading === "loading") {
    return (
      <Center style={{ width: "100%", height: "200px" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Title order={3} mb={20}>
        Your Upcoming bookings
      </Title>

      {bookings.length === 0 ? (
        <Text>You have no upcoming bookings.</Text>
      ) : (
        <Grid>
          {bookings.map((booking) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={booking.id}>
              <CustomerBookingCard venue={booking} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
}

export default CustomerListBookings;
