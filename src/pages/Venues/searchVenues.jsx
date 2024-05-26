import { Text, TextInput, Button, Grid } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchResults,
  searchVenues,
} from "../../store/venues/venueSlice";
function SearchVenues() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

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
      </Grid>
    </>
  );
}

export default SearchVenues;
