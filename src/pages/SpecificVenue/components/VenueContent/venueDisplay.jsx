import { Title, Text, Stack } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDateTime } from "../../../../utils/format/dateFormat";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDateTime(created);

  return (
    <>
      <Title>{name}</Title>
      <Stack>
        <Title order={4}>Description</Title>
        <Text>{description}</Text>
      </Stack>
      <Text>Fulltime: {newDate}</Text>
      <Text>Price: {formattedPrice} /night</Text>
    </>
  );
}

export default VenueDisplay;
