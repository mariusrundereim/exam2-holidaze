import { Card, Title, Text } from "@mantine/core";
import formatCurrency from "../../../utils/format/currencyFormat";

function BookingVenueCard({ venue }) {
  const { price, name, description, created } = venue;
  return (
    <>
      <Card>
        <Title order={3}>Book on {name}</Title>
        <Text>{formatCurrency(price)}</Text>
      </Card>
    </>
  );
}

export default BookingVenueCard;
