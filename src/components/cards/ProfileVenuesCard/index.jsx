import {
  Card,
  Image,
  Title,
  Text,
  Button,
  Group,
  Flex,
  Popover,
  Grid,
  Stack,
} from "@mantine/core";
import { rem } from "@mantine/core";
import { IconUsers, IconMapPin } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { handleConfirmDelete, handleEditButton } from "./handleActions";
import { formattedDateTime } from "../../../utils/format/dateFormat";
import { useNavigate } from "react-router-dom";
function ProfileVenuesCard({ venue, venueId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    created,
    updated,
    name,
    bookings,
    description,
    maxGuests,
    location: { address, city, zip, country },
    media,
  } = venue;
  const firstImage = media[0]?.url;

  const handlePageClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  // Edit venue

  const editVenue = async (venueId) => {
    try {
      await dispatch(handleEditButton(venueId));
      navigate(`/venues/edit/${venueId}`);
    } catch (error) {
      console.error("Failed to fetch and navigate:", error);
    }
  };

  // Created & Update

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={firstImage}
          onClick={handlePageClick}
          height={140}
          alt="Norway"
        />
      </Card.Section>
      <Card.Section p={10}>
        <Title order={3}>{name}</Title>
        <Text>
          {address}, {zip} {city}
        </Text>
      </Card.Section>
      <Card.Section p={10}>
        <Text>Bookings: {bookings.length}</Text>
        <Text>Max guests: {maxGuests}</Text>
        <Text>
          Created:
          {updated ? formattedDateTime(updated) : formattedDateTime(created)}
        </Text>
      </Card.Section>
      <Card.Section p={10}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Button
              variant="outline"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => editVenue(venueId)}
            >
              Edit
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button
                  variant="outline"
                  color="red"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Delete
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text ta="center">Are you sure?</Text>
                <Button
                  color="red"
                  onClick={() => handleConfirmDelete(dispatch, venue.id)}
                >
                  Delete permanently
                </Button>
              </Popover.Dropdown>
            </Popover>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}

export default ProfileVenuesCard;
