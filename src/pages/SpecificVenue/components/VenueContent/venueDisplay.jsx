import { Title, Text, Group, Stack, Flex, Button } from "@mantine/core";
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
      <Flex direction="row" justify="space-between" wrap="wrap">
        <Stack>
          <Title order={4}>Description</Title>
          <Text>{description}</Text>
        </Stack>
        <Flex direction="column" gap={10}>
          <Text size="xl">{newDate}</Text>
          <Text size="xl">{formattedPrice} /night</Text>
          <Text size="xl">Guests: {maxGuests}</Text>
          <Button>Book</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default VenueDisplay;
