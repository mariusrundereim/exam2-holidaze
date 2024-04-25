import { Title, Text } from "@mantine/core";

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
      <Title>Location:</Title>
      <Text>Address: {addressMessage(location)}</Text>
      <Text>City: {cityMessage(location)}</Text>
      <Text>Country: {countryMessage(location)}</Text>
      <Text>Continent: {continentMessage(location)}</Text>
      <Text>Zip: {zipMessage(location)}</Text>
    </>
  );
}

export default LocationDisplay;
