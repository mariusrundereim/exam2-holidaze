import { Grid, Title, Text, Button, Group, Stack } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDate } from "../../../../utils/format/dateFormat";
import BookingButton from "../../../../components/venues/BookingButton";
import { useParams } from "react-router-dom";
import GalleryPicturesVenue from "../Gallery";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price, media } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDate(created);
  const { venueId } = useParams();

  return (
    <>
      <Grid gutter={80}>
        <Grid.Col my={30}>
          <Title>{name}</Title>
        </Grid.Col>
        <Grid.Col>
          <Group>
            <BookingButton venueId={venueId} />
            <GalleryPicturesVenue venueId={venueId} media={media} />
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Title order={4} mb={10}>
            Description
          </Title>
          <Text>{description}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4} mb={10}>
            Information
          </Title>

          <Stack gap="xs">
            <Text size="xl">{formattedPrice} /night</Text>
            <Text size="xl">{maxGuests} guests</Text>
            <Text size="xl">Created: {newDate}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueDisplay;
