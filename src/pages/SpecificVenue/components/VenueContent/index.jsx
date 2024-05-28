import { Grid, Title } from "@mantine/core";
import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";
import VenueDisplay from "./venueDisplay";
import OwnerDisplay from "./ownerDisplay";
function VenueContent({ venue }) {
  const { name, location, meta } = venue;
  console.log("vvv", venue);
  return (
    <>
      <Grid gutter={100}>
        <Grid.Col>
          <VenueDisplay venue={venue} />
        </Grid.Col>
        <Grid.Col>
          <LocationDisplay location={location} />
        </Grid.Col>
        <Grid.Col>
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
