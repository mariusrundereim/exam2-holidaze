import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { rem } from "@mantine/core";
import { IconUsers, IconMapPin } from "@tabler/icons-react";
function ProfileVenuesCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Title</Text>

        <Group>
          <Text>Adresseveien 2, 4545 Gol</Text>
        </Group>
        <Group>
          <IconUsers style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          <Text>5</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        Description here..
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
