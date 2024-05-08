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
      <Image src={banner.url} radius="md" h={200} />
      <Avatar src={avatar.url} size="xl" />
      <Title order={3}>{name}</Title>
      <Badge>{role}</Badge>
      <Text>{bio}</Text>
    </>
  );
}

export default ProfileHeader;
