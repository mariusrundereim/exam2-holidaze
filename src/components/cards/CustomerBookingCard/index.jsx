import { Card, Title, Text, Button, Grid } from "@mantine/core";
import { formattedDateTime } from "../../../utils/format/dateFormat";
import { useNavigate } from "react-router-dom";
function CustomerBookingCard({ venue }) {
  // console.log("Bookingsvenue", venue);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/venues/${venue.id}`);
  };
  const {
    dateFrom,
    dateTo,
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
          </Grid>
        </Card.Section>
        <Card.Section p={10}>
          <Button onClick={handleButtonClick} fullWidth>
            View venue
          </Button>
        </Card.Section>
      </Card>
    </>
  );
}

export default CustomerBookingCard;
