import { Card, Title, Text, Button, Grid, Popover } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
import { useDispatch } from "react-redux";
function CustomerBookingCard({ venue }) {
  const dispatch = useDispatch();

  const {
    dateFrom,
    dateTo,
    id,
    venue: {
      name,
      location: { address, city },
    },
  } = venue;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Title order={3}>{name}</Title>

              <Text>
                {address}, {city}
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>{formattedDateTime(dateFrom)}</Text>
              <Text>{formattedDateTime(dateTo)}</Text>
            </Grid.Col>
            <Grid.Col>ID: {id}</Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default CustomerBookingCard;
