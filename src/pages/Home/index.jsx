import { Title, Text } from "@mantine/core";
import VenuesInSweden from "./lists/listVenuesInSweden";
import VenuesWithPets from "./lists/listVenuesWithPets";
import VenuesBySmallPrice from "./lists/listVenuesBySmallPrice";
import VenuesByFamilyCity from "./lists/listVenuesByFamilyCity";
function Home() {
  return (
    <>
      <VenuesInSweden />
      <VenuesWithPets />
      <VenuesBySmallPrice />
      <VenuesByFamilyCity />
    </>
  );
}

export default Home;
