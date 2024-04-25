import { Title, Text } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  return (
    <>
      <Title>{name}</Title>
      <h2>Venue Information</h2>
      <Text>Description: {description}</Text>
      <Text>{created}</Text>
      <Text>Price: {formattedPrice}</Text>
    </>
  );
}

export default VenueDisplay;
