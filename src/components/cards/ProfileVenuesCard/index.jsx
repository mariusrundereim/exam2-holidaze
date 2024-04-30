import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { rem } from "@mantine/core";
import { IconUsers, IconMapPin } from "@tabler/icons-react";
function ProfileVenuesCard({ venue }) {
  const { name, description, maxGuests, location, media } = venue;

  const firstImage = media[0].url;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={firstImage} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>

        <Group>
          <IconMapPin
            style={{ width: rem(22), height: rem(22) }}
            stroke={1.8}
          />
          <Text>Adresseveien 2, 4545 Gol</Text>
        </Group>
        <Group>
          <IconUsers style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          <Text>{maxGuests}</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Flex gap="md" direction={{ base: "column", sm: "row" }}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Edit
        </Button>

        <Button color="red" fullWidth mt="md" radius="md">
          Delete
        </Button>
      </Flex>
    </Card>
  );
}

export default ProfileVenuesCard;
