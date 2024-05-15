import { Card, Title, Text, Button, Grid, Popover } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
import { useNavigate } from "react-router-dom";
function CustomerBookingCard({ venue }) {
  const navigate = useNavigate();

  const {
    dateFrom,
    dateTo,
    id,
    venue: {
      name,
      location: { address, city },
    },
  } = venue;

  const handleButtonClick = () => {
    navigate(`/venues/${venue.id}`);
  };
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Title onClick={handleButtonClick} order={3}>
                {name}
              </Title>

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
        <Card.Section p={10}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Button
                variant="outline"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => editVenue(venueId)}
              >
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button
                    variant="outline"
                    color="red"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    Delete
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text ta="center">Are you sure?</Text>
                  <Button
                    color="red"
                    onClick={() => handleConfirmDelete(dispatch, venue.id)}
                  >
                    Delete permanently
                  </Button>
                </Popover.Dropdown>
              </Popover>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default CustomerBookingCard;
