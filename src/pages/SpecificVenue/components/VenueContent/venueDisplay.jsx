import { Title, Text } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDateTime } from "../../../../utils/format/dateFormat";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDateTime(created);

  return (
    <>
      <Title>{name}</Title>
      <h2>Venue Information</h2>
      <Text>Description: {description}</Text>
      <Text>Fulltime: {newDate}</Text>
      <Text>Price: {formattedPrice}</Text>
    </>
  );
}

export default VenueDisplay;
