import { Title, Text, Stack, Space, Flex } from "@mantine/core";

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
      <Flex gap="xl" direction="row" wrap="wrap">
        <Stack>
          <Title order={4}>Address:</Title>
          <Text>{addressMessage(location)}</Text>
        </Stack>
        <Stack>
          <Title order={4}>City</Title>
          <Text>
            {zipMessage(location)},{cityMessage(location)}
          </Text>
        </Stack>

        <Stack>
          <Title order={4}>Country</Title>
          Country: {countryMessage(location)}, {continentMessage(location)}
        </Stack>
      </Flex>
    </>
  );
}

export default LocationDisplay;
