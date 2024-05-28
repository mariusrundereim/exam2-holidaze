import {
  Text,
  TextInput,
  Button,
  Grid,
  Drawer,
  Group,
  Card,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  searchVenues,
  clearFilteredVenues,
} from "../../store/venues/venueSlice";
import { useDisclosure } from "@mantine/hooks";
import FilterVenues from "./filterVenues";
import { IconFilter, IconZoomReset, IconSearch } from "@tabler/icons-react";
function SearchVenues() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const searchResults = useSelector((state) => state.venues.searchVenues);
  const searchQuery = useSelector((state) => state.venues.searchQuery);

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(searchVenues({ query }));
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(clearSearchResults());
    dispatch(clearFilteredVenues());
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <>
      <Grid pb={40}>
        <Grid.Col>
          <Card>
            <Card.Section>
              <TextInput
                label="Search venues"
                placeholder="Where to stay?"
                leftSection={<IconSearch size={18} />}
                value={query}
                onChange={handleChange}
              />
            </Card.Section>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Group>
            <Button
              onClick={handleClear}
              variant="light"
              color="orange"
              leftSection={<IconZoomReset size={18} />}
            >
              Clear
            </Button>
            <Button
              onClick={open}
              leftSection={<IconFilter size={18} />}
              variant="default"
            >
              Filter
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Text>
            {searchResults.length} results on {searchQuery}
          </Text>
        </Grid.Col>
      </Grid>
      <Drawer opened={opened} onClose={close} title="Filter venues">
        <FilterVenues />
      </Drawer>
    </>
  );
}

export default SearchVenues;
