import { Grid, Title, Text, Button } from "@mantine/core";
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
      <Grid>
        <Grid.Col my={30}>
          <Title>{name}</Title>
        </Grid.Col>
        <Grid.Col>
          <BookingButton venueId={venueId} />
          <GalleryPicturesVenue venueId={venueId} media={media} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={4} mb={10}>
            Description
          </Title>
          <Text>{description}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xl">{formattedPrice} /night</Text>
          <Text size="xl">{maxGuests} guests</Text>
          <Text size="md">Created: {newDate}</Text>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueDisplay;
