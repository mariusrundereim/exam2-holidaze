import { Text, TextInput, Button, Grid, Drawer } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchResults,
  searchVenues,
} from "../../store/venues/venueSlice";
import { useDisclosure } from "@mantine/hooks";
import FilterVenues from "./filterCopy/filterVenues";
function SearchVenues() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(searchVenues({ query }));
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(clearSearchResults());
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
          <Drawer opened={opened} onClose={close} title="Filter venues">
            <FilterVenues />
          </Drawer>
          <Button onClick={open}>Filter</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default SearchVenues;
