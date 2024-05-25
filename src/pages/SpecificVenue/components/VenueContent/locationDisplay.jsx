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
          <Text>{countryMessage(location)}</Text>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default LocationDisplay;
