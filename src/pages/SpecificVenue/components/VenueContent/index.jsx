import { Title, Text } from "@mantine/core";
import LocationDisplay from "./locationDisplay";

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
    </>
  );
}

export default VenueContent;
