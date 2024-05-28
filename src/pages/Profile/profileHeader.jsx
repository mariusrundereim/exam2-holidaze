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
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByName } from "../../store/profile/profileSlice";
import { useEffect } from "react";
import VenueSkeleton from "../../components/ui/skeleton";
function ProfileHeader() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfileByName(name));
  }, [dispatch, profile.name]);

  if (loading === "loading") {
    return <VenueSkeleton />;
  }

  const {
    name,
    email,
    bio,
    venueManager,
    avatar = {},
    banner = {},
    _count: { venues, bookings },
  } = profile;

  const role = venueManager ? "Venue Manager" : "Customer";
  const count = venueManager ? venues : bookings;
  const countLabel = venueManager ? "Venues" : "Bookings";

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
                <Stack align="center">
                  <Avatar src={avatar.url} size="lg" />
                  <Badge>{role}</Badge>
                </Stack>
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
                <Title order={3}>{count}</Title>
                <Text>{countLabel}</Text>
              </Card.Section>
              <Card.Section></Card.Section>
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
