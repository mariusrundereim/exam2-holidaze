import {
  IconUserCircle,
  IconAt,
  IconHomePlus,
  IconMobiledata,
  IconHash,
  IconUserQuestion,
} from "@tabler/icons-react";
import { Card, Title, Text, Group } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
function VenueManagerBookingCard({ booking }) {
  const {
    created,
    customer: { name, email },
    id,
    guests,
    dateFrom,
    dateTo,
  } = booking;

  return (
    <>
      <Card shadow="sm" p="lg" withBorder>
        <Card.Section>
          <Group>
            <IconUserCircle />
            <Text>{name}</Text>
          </Group>
          <Group>
            <IconAt />
            <Text>{email}</Text>
          </Group>
        </Card.Section>
        <Card.Section mt="md">
          <Group>
            <IconHomePlus />
            <Text>{formattedDateTime(created)}</Text>
          </Group>
          <Group>
            <IconMobiledata />
            <Text>
              {formattedDateTime(dateFrom)} - {formattedDateTime(dateTo)}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section>
          <Group>
            <IconHash />
            <Text>{id}</Text>
          </Group>
          <Group>
            <IconUserQuestion />
            <Text>{guests} guests</Text>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenueManagerBookingCard;
