import { Avatar, Title, Badge, Group, Stack } from "@mantine/core";
function ProfilesCard({ profile }) {
  const { name, venueManager, avatar = { url, alt } } = profile;
  return (
    <>
      <Group>
        <Avatar src={avatar.url} size="sm" />
        <Title order={4}>{name}</Title>
        <Badge
          size="sm"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          {venueManager ? "Manager" : "Customer"}
        </Badge>
      </Group>
    </>
  );
}

export default ProfilesCard;
