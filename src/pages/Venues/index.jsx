import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListVenues from "./listVenues";

import { fetchVenues } from "../../store/venues/venueSlice";
import { Grid } from "@mantine/core";
import SearchVenues from "./searchVenues";
import VenueSkeleton from "../../components/ui/skeleton";

function VenuesListPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);

  const filteredVenues = useSelector((state) => state.venues.allVenuesList);
  const searchResults = useSelector((state) => state.venues.searchVenues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (loading === "loading") {
    return <VenueSkeleton />;
  }

  const venuesToSoonDisplay =
    searchResults.length > 0 ? searchResults : filteredVenues;

  // console.log("yooooooo", venuesToSoonDisplay);

  // // venues to display --- filter them now
  // const venuesToDisplay = venuesToSoonDisplay.filter((venue) => {
  //   if (filters.wifi.checked && venue.meta.wifi != filters.wifi.value) {
  //     return false;
  //   }
  //   return true;
  // });

  // console.log("eivind", venuesToDisplay);

  return (
    <>
      <Grid>
        <Grid.Col>
          <SearchVenues />
        </Grid.Col>
      </Grid>

      <ListVenues venues={venuesToSoonDisplay} />
    </>
  );
}

export default VenuesListPage;
