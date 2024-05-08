import { Card, Image, Title, Text, Group, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/format/dateFormat";
function VenuesCard({ venue }) {
  const imageUrl = venue.media?.[0]?.url || "default-image-url";
  const venueName = venue.name || "No image available";

  console.log("Vello Heniue", venue.created);

  const navigate = useNavigate();
  const handlePageClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  const address = venue.location.address;
  const city = venue.location.city;
  const country = venue.location.country;
  const created = venue.created;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            onClick={handlePageClick}
            src={imageUrl}
            alt={venueName}
            height={300}
          />
        </Card.Section>
        <Card.Section p={14}>
          <Grid>
            <Grid.Col>
              <Title order={4}>{venue.name}</Title>
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Card.Section p={14}>
          <Grid>
            <Grid.Col>
              <Text size="sm">{formattedDate(created)}</Text>
            </Grid.Col>
            <Grid.Col>
              <Text>{venue.maxGuests} guests</Text>
            </Grid.Col>
            <Grid.Col>
              <Text>
                {city} ({country})
              </Text>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenuesCard;
