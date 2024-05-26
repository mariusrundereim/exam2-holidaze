import { Card, Image, Title, Text, Group, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/format/dateFormat";
import formatCurrency from "../../../utils/format/currencyFormat";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchVenues } from "../../../store/venues/venueSlice";
function VenuesCard({ venue }) {
  const dispatch = useDispatch();

  const imageUrl = venue.media?.[0]?.url || "default-image-url";
  const venueName = venue.name || "No image available";

  const navigate = useNavigate();
  const handlePageClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  const {
    price,
    location: { address, city, zip, country },
    maxGuests,
  } = venue;

  return (
    <>
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image
            onClick={handlePageClick}
            src={imageUrl}
            alt={venueName}
            height={300}
          />
        </Card.Section>
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Title order={4} lineClamp={1}>
                {venue.name}
              </Title>
              <Text lineClamp={1}>
                {zip} {city}, {country}
              </Text>
            </Grid.Col>
          </Grid>
        </Card.Section>
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Text>{price} / night</Text>
              <Text>{maxGuests} guests</Text>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default VenuesCard;
