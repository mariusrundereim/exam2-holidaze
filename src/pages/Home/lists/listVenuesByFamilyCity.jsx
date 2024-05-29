import { useSelector } from "react-redux";
import { Grid, Title, Text, Chip, Group } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";
import VenueSkeleton from "../../../components/ui/skeleton";

const filterVenues = (venues) => {
  return venues.filter((venue) => {
    const { maxGuests, meta, location } = venue;
    const { wifi, parking, breakfast } = meta;
    const { city } = location;

    const isWithinGuestRange = maxGuests >= 4 && maxGuests <= 8;
    const hasRequiredAmenities = wifi && parking && breakfast;
    const isInPreferredCity = [
      "Oslo",
      "Bergen",
      "Stavanger",
      "Kristiansand",
      "Trondheim",
    ].includes(city);

    return isWithinGuestRange && hasRequiredAmenities && isInPreferredCity;
  });
};

function VenuesByFamilyCity() {
  const loading = useSelector((state) => state.venues.loading);
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  const filteredVenues = filterVenues(allVenuesList);

  if (loading === "loading") {
    return <VenueSkeleton />;
  }
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={3}>Family trip to a Norwegian city</Title>
          <Text>Take a weekend trip to a big city in Norway</Text>
        </Grid.Col>
        <Grid.Col>
          <Group gap="xs">
            <Chip defaultChecked size="xs" radius="sm">
              4-8 guests
            </Chip>
            <Chip defaultChecked size="xs" radius="sm">
              Wifi, Parking, Breakfast
            </Chip>
            <Chip defaultChecked size="xs" radius="sm">
              Oslo, Bergen, Kristiansand, Trondheim
            </Chip>
          </Group>
        </Grid.Col>

        {filteredVenues.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesByFamilyCity;
