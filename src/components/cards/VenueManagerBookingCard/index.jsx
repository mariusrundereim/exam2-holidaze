import {
  IconUserCircle,
  IconAt,
  IconHomePlus,
  IconMobiledata,
  IconHash,
  IconUserQuestion,
} from "@tabler/icons-react";
import { Card, Title, Text, Group, Stack, Grid } from "@mantine/core";
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
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Text fw={600}>{name}</Text>
              <Text>{email}</Text>
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Card.Section p={10}>
          <Group>
            <IconHomePlus size={20} />
            <Text>{formattedDateTime(created)}</Text>
          </Group>
          <Group>
            <IconMobiledata size={20} />
            <Text>
              {formattedDateTime(dateFrom)} - {formattedDateTime(dateTo)}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section p={10}>
          <Group>
            <IconHash size={20} />
            <Text>{id}</Text>
          </Group>
          <Group>
            <IconUserQuestion size={20} />
            <Text>{guests} guests</Text>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenueManagerBookingCard;
