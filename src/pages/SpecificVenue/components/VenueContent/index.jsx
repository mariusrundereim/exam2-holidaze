import { Title, Text } from "@mantine/core";
import LocationDisplay from "./locationDisplay";
import AmenitiesDisplay from "./amenitiesDisplay";

function VenueContent({ venue }) {
  const { name, description, created, location, maxGuests, meta } = venue;
  return (
    <>
      <h2>Venue content</h2>
      <Title>{name}</Title>
      <Text>{description}</Text>
      <Text>{created}</Text>
      <Text>{location.address}</Text>
      <LocationDisplay location={location} />
      <AmenitiesDisplay meta={meta} />
    </>
  );
}

export default VenueContent;
