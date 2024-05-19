import { Card, Text } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
function VenueManagerBookingCard({ booking }) {
  const {
    customer: { name, email },
    dateFrom,
    dateTo,
  } = booking;

  return (
    <>
      <Card shadow="sm" p="md" withBorder>
        <Card.Section>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
        </Card.Section>
        <Card.Section mt="md">
          <Text>Date From: {formattedDateTime(dateFrom)}</Text>
          <Text>Date To: {formattedDateTime(dateTo)}</Text>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenueManagerBookingCard;
