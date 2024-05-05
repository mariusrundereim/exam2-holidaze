import { Group, Avatar, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
function ItemProfiles({ profile }) {
  const { name, avatar = { url, alt } } = profile;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${profile.name}`);
  };
  return (
    <>
      <Group onClick={handleProfileClick}>
        <Avatar src={avatar.url} size="sm" />
        <Text>{name}</Text>
      </Group>
    </>
  );
}

export default ItemProfiles;
