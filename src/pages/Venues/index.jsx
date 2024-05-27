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

  const venuesToDisplay =
    searchResults.length > 0 ? searchResults : filteredVenues;

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
