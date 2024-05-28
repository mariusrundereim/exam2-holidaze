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
  console.log("ppp", profile);

  const { name, email, bio, venueManager, avatar = {}, banner = {} } = profile;
  useEffect(() => {
    dispatch(fetchProfileByName(name));
  }, [dispatch]);

  const role = venueManager ? "Venue Manager" : "Customer";

  return (
    <>
      <Grid>
        <Grid.Col>
          <Image src={banner.url} radius="md" h={{ lg: 440, sm: 240 }} />
        </Grid.Col>
        <Grid.Col>
          <Title order={2}>Hello, {name}!</Title>
        </Grid.Col>
        <Grid.Col>
          <Flex direction={"column"} gap="md">
            <Card withBorder>
              <Card.Section p={10}>
                <Text fw={500}>{name}</Text>
                <Text>{email}</Text>
                <Badge>{role}</Badge>
                <Avatar src={avatar.url} size="lg" />
              </Card.Section>
              <Card.Section></Card.Section>
            </Card>
            <Card withBorder>
              <Card.Section p={10}>
                <Title order={4}>Email:</Title>
                <Text>{email}</Text>
              </Card.Section>
            </Card>
            <Card withBorder>
              <Card.Section p={10}>
                <Title order={4}>Biography</Title>
                <Text>{bio || "Add biography on settings"}</Text>
              </Card.Section>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ProfileHeader;
