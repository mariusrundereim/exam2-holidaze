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
import { clearSelectedVenue } from "../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import { useEffect } from "react";
function ProfileHeader() {
  const dispatch = useDispatch();

  // const profile = useSelector((state) => state.profile);
  const { name, email, venueManager, avatar } = profile;

  //   const profile = useSelector((state) =>
  //     profileName === "user" ? state.user : state.profile[profileName]
  //   );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileByName());
  }, [dispatch]);

  const createVenue = () => {
    dispatch(clearSelectedVenue());
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