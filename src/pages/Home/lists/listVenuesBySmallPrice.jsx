import { useSelector } from "react-redux";
import { Grid, Title } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";

const filterVenuesBySmallPrice = (venues, maxPrice) => {
  return venues.filter((venue) => venue.price <= maxPrice);
};

function VenuesBySmallPrice() {
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  const venuesByPrice = filterVenuesBySmallPrice(allVenuesList, 300);
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={3}>Stay good with small budget</Title>
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
