import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListVenues from "./listVenues";
import filterValidVenues from "../../utils/venues/filterVenues";
import { fetchVenues } from "../../store/venues/venueSlice";
import { Drawer, Button, Grid } from "@mantine/core";
import SearchVenues from "./searchVenues";
import { useDisclosure } from "@mantine/hooks";
import FilterVenues from "./filter/filterVenues";
import { IconFilter } from "@tabler/icons-react";
function VenuesListPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);

  const filteredVenues = useSelector((state) => {
    const allVenues = state.venues.allVenuesList;
    return filterValidVenues(allVenues);
  });

  const searchResults = useSelector((state) => state.venues.searchVenues.data);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

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

      {searchResults && searchResults.length > 0 ? (
        <ListVenues venues={searchResults} />
      ) : (
        <ListVenues venues={filteredVenues} />
      )}
      <Button>Button</Button>
    </>
  );
}

export default VenuesListPage;
