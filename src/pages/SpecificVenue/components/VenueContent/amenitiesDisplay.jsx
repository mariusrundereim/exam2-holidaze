import { Title, Text, Group, Stack } from "@mantine/core";
import { IconBaguette, IconPaw, IconCar, IconWifi } from "@tabler/icons-react";
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
      <Title>Amenities</Title>

      <Group align="center" justify="space-around" gap="xs" wrap="wrap" p={30}>
        {/* Breakfast */}
        <Stack align="center" justify="center" gap="xs">
          <IconBaguette
            style={{ width: rem(38), height: rem(38) }}
            stroke={2}
          />
          <Title order={3}>Breakfast</Title>
          <Text>{breakfastMessage(meta)}</Text>
        </Stack>
        {/* Parking */}
        <Stack align="center" justify="center" gap="xs">
          <IconCar style={{ width: rem(38), height: rem(38) }} stroke={2} />
          <Title order={3}>Parking</Title>
          <Text>{parkingMessage(meta)}</Text>
        </Stack>
        {/* Pets */}
        <Stack align="center" justify="center" gap="xs">
          <IconPaw style={{ width: rem(38), height: rem(38) }} stroke={2} />
          <Title order={3}>Pets</Title>
          <Text>{petsMessage(meta)}</Text>
        </Stack>
        {/* Wifi */}
        <Stack align="center" justify="center" gap="xs">
          <IconWifi style={{ width: rem(38), height: rem(38) }} stroke={2} />
          <Title order={3}>WIFI</Title>
          <Text>{wifiMessage(meta)}</Text>
        </Stack>
      </Group>
    </>
  );
}

export default AmenitiesDisplay;
