import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";
import VenueDisplay from "./venueDisplay";
function VenueContent({ venue }) {
  const { location, meta } = venue;
  return (
    <>
      <VenueDisplay venue={venue} />
      <LocationDisplay location={location} />
      <AmenitiesDisplay meta={meta} />
    </>
  );
}

export default VenueContent;
