import { Grid, Card, Title, Text } from "@mantine/core";
import formatCurrency from "../../../utils/format/currencyFormat";
import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../../../utils/booking/calculateTotalPrice";
function BookingVenueCard({ venue, bookingDates }) {
  const { price, name, description, created } = venue;
  console.log("venue", venue);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (bookingDates[0] && bookingDates[1]) {
      const { totalPrice, nights } = calculateTotalPrice(
        bookingDates[0],
        bookingDates[1],
        price
      );
      setTotalPrice(totalPrice);
      setNights(nights);
    }
  }, [bookingDates, price]);

  return (
    <>
      <Card>
        <Card.Section py={20} withBorder>
          <Title order={3}>Book on {name}</Title>
        </Card.Section>
        <Card.Section py={20} withBorder>
          <Grid>
            <Grid.Col span={4}>
              <Title order={4}>Price per night</Title>
              <Text>{formatCurrency(price)}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={4}>Total price</Title>
              <Text>{formatCurrency(totalPrice)}</Text>
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Card.Section py={20} withBorder>
          <Title order={4}>Days</Title>
          <Text>Sleeping days: {nights}</Text>
        </Card.Section>
      </Card>
    </>
  );
}

export default BookingVenueCard;
