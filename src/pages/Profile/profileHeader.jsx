import {
  Grid,
  Flex,
  Group,
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Badge,
  Image,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { clearSelectedVenue } from "../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import { useEffect } from "react";
function ProfileHeader() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const { name, email, bio, venueManager, avatar = {}, banner = {} } = profile;
  useEffect(() => {
    dispatch(fetchProfileByName());
  }, [dispatch]);

  const role = venueManager ? "Venue Manager" : "Customer";

  return (
    <>
      <Grid>
        <Grid.Col>
          <Image src={banner.url} radius="md" h={200} />
        </Grid.Col>
        <Grid.Col mt={-50}>
          <Center>
            <Avatar src={avatar.url} size="xl" />
          </Center>
        </Grid.Col>
        <Grid.Col>
          <Center>
            <Stack align="center">
              <Title order={3}>{name}</Title>
              <Badge>{role}</Badge>
            </Stack>
          </Center>
        </Grid.Col>
        <Grid.Col>
          <Title order={4}>Biography</Title>
          <Text>{bio}</Text>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ProfileHeader;
