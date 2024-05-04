import { Avatar, Title, Badge, Group, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
function ProfilesCard({ profile }) {
  const { name, venueManager, avatar = { url, alt } } = profile;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${profile.name}`);
  };
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
        <Button variant="outline" onClick={handleProfileClick}>
          View
        </Button>
      </Group>
    </>
  );
}

export default ProfilesCard;
