import { Grid, Title, Text, Group, Flex } from "@mantine/core";
import {
  IconBaguette,
  IconPaw,
  IconCar,
  IconWifi,
  IconChefHat,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import {
  wifiMessage,
  parkingMessage,
  petsMessage,
  breakfastMessage,
} from "../../utils/displayMessages";
function AmenitiesDisplay({ meta }) {
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={4} mb={10}>
            Facilities
          </Title>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "sm", sm: "lg" }}
          >
            <Group>
              <IconChefHat />
              <Text>{breakfastMessage(meta)}</Text>
            </Group>
            <Group>
              <IconCar />
              <Text>{parkingMessage(meta)}</Text>
            </Group>
            <Group>
              <IconPaw />
              <Text>{petsMessage(meta)}</Text>
            </Group>
            <Group>
              <IconWifi />
              <Text>{wifiMessage(meta)}</Text>
            </Group>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AmenitiesDisplay;
