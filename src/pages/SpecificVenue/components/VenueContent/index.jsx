import { Grid, Title } from "@mantine/core";
import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";
import VenueDisplay from "./venueDisplay";
import OwnerDisplay from "./ownerDisplay";
import DetailsVenue from "./detailsDisplay";
import DescriptionVenue from "./descDisplay";
function VenueContent({ venue }) {
  const { name, location, meta } = venue;
  return (
    <>
      <Grid gutter={{ base: 60, md: 60, sm: 20 }}>
        <Grid.Col>
          <VenueDisplay venue={venue} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DescriptionVenue venue={venue} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DetailsVenue venue={venue} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <LocationDisplay location={location} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <AmenitiesDisplay meta={meta} />
        </Grid.Col>
        <Grid.Col>
          <OwnerDisplay venue={venue} />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueContent;
