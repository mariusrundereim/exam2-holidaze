import { Card, Title, Text } from "@mantine/core";
import formatCurrency from "../../../utils/format/currencyFormat";
function BookingVenueCard({ venue }) {
  console.log("booking ven", venue);

  const { price, name, description, created } = venue;
  return (
    <>
      <Card>
        <Title order={4}>{name}</Title>
        <Text>{description}</Text>
        <Text>{formatCurrency(price)}</Text>
      </Card>
    </>
  );
}

export default BookingVenueCard;
