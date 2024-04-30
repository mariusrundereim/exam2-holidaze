import { Title, Text, Group, Stack, Flex } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDateTime } from "../../../../utils/format/dateFormat";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDateTime(created);

  return (
    <>
      <Group justify="center" mih={100}>
        <Title>{name}</Title>
      </Group>
      <Flex direction="column">
        <Title order={4}>Description</Title>
        <Text>{description}</Text>
      </Flex>
      <Flex>
        <Text size="xl">{newDate}</Text>
        <Text size="xl">{formattedPrice} /night</Text>
      </Flex>
    </>
  );
}

export default VenueDisplay;
