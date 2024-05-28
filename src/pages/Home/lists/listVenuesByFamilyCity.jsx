import { useSelector } from "react-redux";
import { Grid, Title, Text } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";
import VenueSkeleton from "../../../components/ui/skeleton";

const filterVenues = (venues) => {
  return venues.filter((venue) => {
    const { maxGuests, meta, location } = venue;
    const { wifi, parking, breakfast } = meta;
    const { city } = location;

    const isWithinGuestRange = maxGuests >= 4 && maxGuests <= 8;
    const hasRequiredAmenities = wifi && parking && breakfast;
    const isInPreferredCity = ["Oslo", "Bergen", "Stavanger"].includes(city);

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
