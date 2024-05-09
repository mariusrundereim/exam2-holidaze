import { Grid, Title, Text, Button } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDate } from "../../../../utils/format/dateFormat";
import BookingButton from "../../../../components/venues/BookingButton";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDate(created);

  return (
    <>
      <Grid>
        <Grid.Col my={30}>
          <Title>{name}</Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={4} mb={10}>
            Description
          </Title>
          <Text>{description}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xl">Created: {newDate}</Text>
          <Text size="xl">{formattedPrice} /night</Text>
          <Text size="xl">{maxGuests} guests</Text>
        </Grid.Col>
        <Grid.Col>
          <BookingButton />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueDisplay;
