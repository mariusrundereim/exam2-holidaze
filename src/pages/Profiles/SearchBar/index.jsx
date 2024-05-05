import { Input, Grid } from "@mantine/core";
import { IconUserCircle, IconChevronDown } from "@tabler/icons-react";
function SearchPanelProfiles() {
  return (
    <>
      <Grid align="center">
        <Input size="md" leftSection={<IconUserCircle size={24} />} />
        <Input
          component="select"
          rightSection={<IconChevronDown size={14} stroke={1.5} />}
          pointer
          mt="md"
        >
          <option value="venuemanager">Venue Manager</option>
          <option value="customer">Customer</option>
        </Input>
      </Grid>
    </>
  );
}

export default SearchPanelProfiles;
