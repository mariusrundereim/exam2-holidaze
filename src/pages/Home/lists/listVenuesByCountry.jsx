import { Grid, Title, Text } from "@mantine/core";
import VenuesCard from "../../../components/cards/VenuesCard";
import { useSelector } from "react-redux";
import VenueSkeleton from "../../../components/ui/skeleton";
import {
  getNextNationalDay,
  nationalDays,
} from "../../../utils/venue/nationalDays";
import { isWithinTwoWeeksBefore } from "../../../utils/venue/weekBeforeCheck";

const filterVenuesByCountry = (venues, country) => {
  return venues.filter((venue) => venue.location.country === country);
};

function VenuesNationalDay() {
  const loading = useSelector((state) => state.venues.loading);
  const allVenuesList = useSelector((state) => state.venues.allVenuesList);
  // const venuesInSweden = filterVenuesByCountry(allVenuesList, "Sweden");
  const { nextCountry, nextDate } = getNextNationalDay();

  // Upcoming national day
  const venuesForNextNationalDay = allVenuesList.filter(
    (venue) =>
      venue.location.country === nextCountry &&
      isWithinTwoWeeksBefore(nextCountry)
  );

  if (loading === "loading") {
    return <VenueSkeleton />;
  }
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={3}>Celebrate the upcoming national day!</Title>
          <Text>Take a vacation in {nextCountry}</Text>
        </Grid.Col>

        {venuesForNextNationalDay.map((venue) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={venue.id}>
            <VenuesCard venue={venue} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default VenuesNationalDay;
