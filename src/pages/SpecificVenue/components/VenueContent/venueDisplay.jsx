import { Title, Text } from "@mantine/core";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests } = venue;
  return (
    <>
      <Title>{name}</Title>
      <h2>Venue Information</h2>
      <Text>Description: {description}</Text>
      <Text>{created}</Text>
    </>
  );
}

export default VenueDisplay;
