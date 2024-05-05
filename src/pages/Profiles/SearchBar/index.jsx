import { Input, Grid } from "@mantine/core";
import { IconUserCircle, IconChevronDown } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../utils/debounce";
function SearchPanelProfiles() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [profileType, setProfileType] = useState("all");

  const debouncedSearch = useCallback(
    debounce((searchText, profileType) => {
      switch (profileType) {
        case "venuemanager":
          dispatch(searchVenueManagers(searchText));
          break;
        case "customer":
          dispatch(searchCustomers(searchText));
          break;
        default:
          dispatch(searchAllProfiles(searchText));
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (searchText.trim()) {
      debouncedSearch(searchText, profileType);
    }
  }, [searchText, profileType, debouncedSearch]);
  return (
    <>
      <Grid align="center">
        <Input
          size="md"
          leftSection={<IconUserCircle size={24} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Input
          component="select"
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
          rightSection={<IconChevronDown size={14} stroke={1.5} />}
          pointer
          mt="md"
        >
          <option value="all">All</option>
          <option value="venuemanager">Venue Manager</option>
          <option value="customer">Customer</option>
        </Input>
      </Grid>
    </>
  );
}

export default SearchPanelProfiles;
