import { Grid } from "@mantine/core";
import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";
import VenueDisplay from "./venueDisplay";
import OwnerDisplay from "./ownerDisplay";
function VenueContent({ venue }) {
  const { location, meta } = venue;
  return (
    <>
      <VenueDisplay venue={venue} />
      <LocationDisplay location={location} />
      <AmenitiesDisplay meta={meta} />
      <OwnerDisplay venue={venue} />
    </>
  );
}

export default VenueContent;
