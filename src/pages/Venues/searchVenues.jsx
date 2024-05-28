import { Text, TextInput, Button, Grid, Drawer } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  searchVenues,
  clearFilteredVenues,
} from "../../store/venues/venueSlice";
import { useDisclosure } from "@mantine/hooks";
import FilterVenues from "./filterVenues";
import { IconFilter } from "@tabler/icons-react";
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
      <Grid align="flex-end">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <TextInput
            label="Search venues"
            placeholder="Where to stay?"
            value={query}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleSearch}>Search</Button>
        </Grid.Col>
        <Grid.Col>
          <Text>You searched: {searchQuery}</Text>
          <Text>Search results: {searchResults.length}</Text>
        </Grid.Col>
        <Grid.Col>
          <Drawer opened={opened} onClose={close} title="Filter venues">
            <FilterVenues />
          </Drawer>
          <Button
            onClick={open}
            leftSection={<IconFilter size={18} />}
            variant="default"
          >
            Filter
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default SearchVenues;
