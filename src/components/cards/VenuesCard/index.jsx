import { Card, Image, Title, Text, Group } from "@mantine/core";
import { rem } from "@mantine/core";
import { IconUsers, IconMapPin } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { formattedDateTime } from "../../../utils/format/dateFormat";
function VenuesCard({ venue }) {
  const imageUrl = venue.media?.[0]?.url || "default-image-url";
  const venueName = venue.name || "No image available";

  console.log("Vello Heniue", venue.created);

  const navigate = useNavigate();
  const handlePageClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  const address = venue.location.address;
  const city = venue.location.city;
  const country = venue.location.country;
  const created = venue.created;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            onClick={handlePageClick}
            src={imageUrl}
            alt={venueName}
            height={300}
          />
        </Card.Section>
        <Card.Section p={14}>
          <Group justify="apart" grow>
            <Title order={4}>{venue.name}</Title>
            <Group>
              <IconUsers
                style={{ width: rem(22), height: rem(22) }}
                stroke={1.5}
              />
              <Text>{venue.maxGuests}</Text>
            </Group>
            <Group>
              <Text>{formattedDateTime(created)}</Text>
            </Group>
          </Group>
          <Group>
            <IconMapPin
              style={{ width: rem(22), height: rem(22) }}
              stroke={1.8}
            />
            <Group>
              <Text>
                {address},{city}, {country}
              </Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenuesCard;
