import { Grid, Title, Group } from "@mantine/core";
import BookingButton from "../../../../components/venues/BookingButton";
import { useParams } from "react-router-dom";
import GalleryPicturesVenue from "../Gallery";
function VenueDisplay({ venue }) {
  const { name, media } = venue;
  const { venueId } = useParams();

  return (
    <>
      <Grid>
        <Grid.Col my={30}>
          <Title>{name}</Title>
        </Grid.Col>
        <Grid.Col>
          <Group>
            <BookingButton venueId={venueId} />
            <GalleryPicturesVenue venueId={venueId} media={media} />
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueDisplay;
