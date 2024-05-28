import { useSelector } from "react-redux";
import { Grid, Title, Text } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";
import VenueSkeleton from "../../../components/ui/skeleton";

const filterVenuesBySmallPrice = (venues, maxPrice) => {
  return venues.filter((venue) => venue.price <= maxPrice);
};

function VenuesBySmallPrice() {
  const loading = useSelector((state) => state.venues.loading);
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  const venuesByPrice = filterVenuesBySmallPrice(allVenuesList, 300);

  if (loading === "loading") {
    return <VenueSkeleton />;
  }
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={3}>Small budget friendly</Title>
          <Text>Stay on a good venue with small budget.</Text>
        </Grid.Col>

        {venuesByPrice.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesBySmallPrice;
