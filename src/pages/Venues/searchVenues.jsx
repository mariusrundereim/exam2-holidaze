import { Text, TextInput, Button } from "@mantine/core";
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
    dispatch(searchVenues({ query }));
  };

  const handleClear = () => {
    setQuery("");
    dispatch(clearSearchResults());
  };
  return (
    <>
      <TextInput
        label="Search venues"
        placeholder="Where to stay?"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button onClick={handleClear}>Clear</Button>
      <Button onClick={handleSearch}>Search</Button>
    </>
  );
}

export default SearchVenues;
