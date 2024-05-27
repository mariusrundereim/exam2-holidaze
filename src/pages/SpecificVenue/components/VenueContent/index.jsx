import { Grid } from "@mantine/core";
import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";
import VenueDisplay from "./venueDisplay";
import OwnerDisplay from "./ownerDisplay";
function VenueContent({ venue }) {
  const { location, meta } = venue;
  return (
    <>
      <Grid gutter={100}>
        <Grid.Col>
          <VenueDisplay venue={venue} />
        </Grid.Col>
        <Grid.Col span={6}>
          <LocationDisplay location={location} />
        </Grid.Col>
        <Grid.Col span={6}>
          <AmenitiesDisplay meta={meta} />
        </Grid.Col>
        <Grid.Col span={6}>
          <OwnerDisplay venue={venue} />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueContent;
