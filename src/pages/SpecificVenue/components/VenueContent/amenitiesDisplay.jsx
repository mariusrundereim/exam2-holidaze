import { Title, Text } from "@mantine/core";

import {
  wifiMessage,
  parkingMessage,
  petsMessage,
  breakfastMessage,
} from "../../utils/displayMessages";
import classes from "./Demo.module.css";
function AmenitiesDisplay({ meta }) {
  return (
    <>
      <Title className={classes.box}>Amenities</Title>

      <Text>Breakfast: {breakfastMessage(meta)}</Text>
      <Text>Parking: {parkingMessage(meta)}</Text>
      <Text>Pets: {petsMessage(meta)}</Text>
      <Text>WIFI: {wifiMessage(meta)}</Text>
    </>
  );
}

export default AmenitiesDisplay;
