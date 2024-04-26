import {
  Flex,
  Group,
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Badge,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
function ProfileHeader({ profile }) {
  const { name, email, venueManager, avatar } = profile;
  const navigate = useNavigate();

  const createVenue = () => {
    navigate(`/venues`);
  };

  // console.log(profile);
  return (
    <>
      <Flex direction={{ base: "column", sm: "row" }}>
        <Group>
          <Avatar src={avatar.url} alt={avatar.alt} size={"xl"} />
          <Stack>
            <Title order={3}>{name}</Title>
            <Text>{email}</Text>
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {venueManager ? "Venue manager" : "Customer"}
            </Badge>
          </Stack>
        </Group>
        {profile.venueManager ? (
          <Group>
            <Button onClick={createVenue}>Add new venue</Button>
            <Button variant="outline">Edit profile</Button>
          </Group>
        ) : (
          <Group>
            <Button variant="outline">Edit profile</Button>
          </Group>
        )}
      </Flex>
    </>
  );
}

export default ProfileHeader;
