import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListVenues from "./listVenues";

import { fetchVenues } from "../../store/venues/venueSlice";
import { Drawer, Button, Grid } from "@mantine/core";
import SearchVenues from "./searchVenues";
import { useDisclosure } from "@mantine/hooks";
import FilterVenues from "./filter/filterVenues";
import { IconFilter } from "@tabler/icons-react";
function VenuesListPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);

  const filteredVenues = useSelector((state) => state.venues.filteredVenues);
  const searchResults = useSelector((state) => state.venues.searchVenues);
  const searchFilterResults = useSelector(
    (state) => state.venues.searchFilterResults
  );
  const [opened, { open, close }] = useDisclosure(false);
  console.log("search all", searchResults);
  console.log("filtered", searchFilterResults);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  const venuesToDisplay =
    searchFilterResults.length > 0
      ? searchFilterResults
      : searchResults.length < 0
      ? searchResults
      : filteredVenues;

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        size="100%"
        title="Filter"
      >
        <FilterVenues />
      </Drawer>
      <Grid align="flex-end">
        <Grid.Col span={{ base: 12, sm: 10 }}>
          <SearchVenues />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 2 }}>
          <Button
            onClick={open}
            leftSection={<IconFilter size={20} />}
            variant="default"
          >
            Filter
          </Button>
        </Grid.Col>
      </Grid>

      <ListVenues venues={venuesToDisplay} />
    </>
  );
}

export default VenuesListPage;
