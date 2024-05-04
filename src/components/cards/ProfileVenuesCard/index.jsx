import { Card, Image, Text, Button, Group, Flex, Popover } from "@mantine/core";
import { rem } from "@mantine/core";
import { IconUsers, IconMapPin } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { handleConfirmDelete, handleEditButton } from "./handleActions";
import { useNavigate } from "react-router-dom";
function ProfileVenuesCard({ venue, venueId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name,
    description,
    maxGuests,
    location: { address, city, zip, country },
    media,
  } = venue;
  const firstImage = media[0].url;

  const editVenue = async (venueId) => {
    try {
      await dispatch(handleEditButton(venueId));
      navigate(`/venues/edit/${venueId}`);
    } catch (error) {
      console.error("Failed to fetch and navigate:", error);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={firstImage} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>

        <Group>
          <IconMapPin
            style={{ width: rem(22), height: rem(22) }}
            stroke={1.8}
          />
          <Text>
            {address}, {zip} {city}
          </Text>
        </Group>
        <Group>
          <IconUsers style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          <Text>{maxGuests}</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Flex gap="md" direction={{ base: "column", sm: "row" }}>
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => editVenue(venueId)}
        >
          Edit
        </Button>

        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button color="red" fullWidth mt="md" radius="md">
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
      </Flex>
    </Card>
  );
}

export default ProfileVenuesCard;
