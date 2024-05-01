import { Card, Title, Text, Button, Group, Stack, Flex } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
function CustomerBookingCard({ venue }) {
  console.log("Bookingsvenue", venue);
  const {
    created,
    dateFrom,
    dateTo,
    guests,
    venue: {
      name,
      maxGuests,
      location: { address, city },
    },
  } = venue;
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p={20}>
          <Stack>
            <Title order={4}>Venue information</Title>
            <Text>{name}</Text>
            <Text>
              {address} - {city}
            </Text>
            <Text>Max guests: {maxGuests}</Text>
          </Stack>
          <Stack>
            <Title order={4}>Staying date:</Title>
            <Text>
              {formattedDateTime(dateFrom)} / {formattedDateTime(dateTo)}
            </Text>
          </Stack>
          <Text>Created: {formattedDateTime(created)}</Text>
        </Card.Section>
        <Card.Section p={20}>
          <Button fullWidth>View venue</Button>
        </Card.Section>
      </Card>
    </>
  );
}

export default CustomerBookingCard;
