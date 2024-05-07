import { Grid, Title, Text, Stack, Space, Flex } from "@mantine/core";

import {
  addressMessage,
  cityMessage,
  countryMessage,
  continentMessage,
  zipMessage,
} from "../../utils/displayMessages";
function LocationDisplay({ location }) {
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={4}>Address</Title>
          <Text>{addressMessage(location)}</Text>
          <Text>
            {zipMessage(location)} {cityMessage(location)}
          </Text>
        </Grid.Col>
        <Grid.Col>
          <Title order={4}>Country</Title>
          <Text>
            {countryMessage(location)} {continentMessage(location)}
          </Text>
        </Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid>
    </>
  );
}

export default LocationDisplay;
