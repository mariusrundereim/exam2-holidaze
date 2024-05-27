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
  Card,
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
    dispatch(fetchProfileByName(name));
  }, [dispatch]);

  const role = venueManager ? "Venue Manager" : "Customer";

  return (
    <>
      <Grid>
        <Grid.Col>
          <Image src={banner.url} radius="md" h={100} />
        </Grid.Col>
        <Grid.Col>
          <Title order={3}>Welcome back, {name}!</Title>
        </Grid.Col>
        <Grid.Col>
          <Avatar src={avatar.url} size="xl" />
          <Stack align="center">
            <Badge>{role}</Badge>
          </Stack>
        </Grid.Col>
        <Grid.Col></Grid.Col>
        <Grid.Col>
          <Card shadow="sm" p={20} radius="md" withBorder>
            <Card.Section>
              <Title order={4}>Biography</Title>
            </Card.Section>
            <Card.Section>
              <Text>{bio}</Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ProfileHeader;
