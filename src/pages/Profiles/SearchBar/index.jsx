import { Input, Grid, Stack } from "@mantine/core";
import { IconUserCircle, IconChevronDown } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../utils/debounce";
import { searchProfiles } from "../../../store/profiles/profilesSlice";
import ProfilesCard from "../../../components/cards/ProfilesCard";
import ItemProfiles from "./itemList";
function SearchPanelProfiles() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [profileType, setProfileType] = useState("all");

  const debouncedSearch = useCallback(
    debounce((searchText) => {
      dispatch(searchProfiles(searchText));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (event) => {
    const value = event.target.value || "";
    setSearchText(value);
    if (value.trim()) {
      debouncedSearch(value);
    }
  };

  // Profile
  const profiles = useSelector((state) => state.profiles.searchResults) || [];
  const filteredProfiles = profiles.filter((profile) => {
    if (profileType === "all") return true;
    return profileType === "venuemanager"
      ? profile.venueManager
      : !profile.venueManager;
  });
  return (
    <>
      <Grid align="center">
        <Input
          size="md"
          leftSection={<IconUserCircle size={24} />}
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search profiles..."
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

      <Stack gap="xs" m={10}>
        {filteredProfiles.map((profile) => (
          <ItemProfiles profile={profile} />
        ))}
      </Stack>
    </>
  );
}

export default SearchPanelProfiles;
