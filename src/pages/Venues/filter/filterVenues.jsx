import {
  Title,
  Grid,
  Group,
  Text,
  TextInput,
  Slider,
  Radio,
  Button,
} from "@mantine/core";
import { useState } from "react";
function FilterVenues() {
  const [wifiChecked, setWifiChecked] = useState(false);
  const [petsChecked, setPetsChecked] = useState(false);
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  return (
    <>
      <Title>Filter</Title>
      <Grid>
        <Grid.Col>Venues found: 16</Grid.Col>
        <Grid.Col>
          <Text>Price</Text>
          <Slider defaultValue={40} label={(value) => `${value} NOK`} />
        </Grid.Col>
        <Grid.Col>
          <Radio.Group label="Ammenities">
            <Group>
              <Radio label="Wifi" value="wifi" />
              <Radio label="Pets" value="pets" />
              <Radio label="Breakfast" value="breakfast" />
              <Radio label="Parking" value="parking" />
            </Group>
          </Radio.Group>
        </Grid.Col>
        <Grid.Col>
          <Button variant="default">Clear</Button>
          <Button variant="light">View results</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default FilterVenues;
