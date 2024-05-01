import "@mantine/dates/styles.css";
import { TextInput, NumberInput, MultiSelect } from "@mantine/core";
import { DatesProvider, DatePicker } from "@mantine/dates";
import { useState } from "react";
function VenueSearchBar() {
  const [valueDate, setValueDate] = useState(null);
  return (
    <>
      <h2>Search</h2>
      <TextInput size="md" label="Place" placeholder="Where?" />
      <MultiSelect
        label="Amenities"
        placeholder="Pick"
        size="md"
        data={["Wifi", "Pets", "Breakfast", "Parking"]}
      />
    </>
  );
}

export default VenueSearchBar;
