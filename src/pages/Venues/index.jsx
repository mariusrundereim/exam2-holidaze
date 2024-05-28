import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchVenues } from "../../store/venues/venueSlice";
import { Grid } from "@mantine/core";
import ListVenues from "./listVenues";
import SearchVenues from "./searchVenues";
import VenueSkeleton from "../../components/ui/skeleton";
import FilterVenues from "./filterCopy/filterVenues";

function VenuesListPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);

  const allVenues = useSelector((state) => state.venues.allVenuesList);
  const searchResults = useSelector((state) => state.venues.searchVenues);
  const searchFilterResults = useSelector(
    (state) => state.venues.searchFilterResults
  );

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const venuesToDisplay =
    searchFilterResults.length > 0
      ? searchFilterResults
      : searchResults.length > 0
      ? searchResults
      : allVenues;

  if (loading === "loading") {
    return <VenueSkeleton />;
  }

  // const venuesToSoonDisplay =
  //   searchResults.length > 0 ? searchResults : allVenues;

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
      <ListVenues venues={venuesToDisplay} />
    </>
  );
}

export default VenuesListPage;
