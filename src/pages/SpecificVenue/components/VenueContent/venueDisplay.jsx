import { Grid, Title, Text, Button } from "@mantine/core";
import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDate } from "../../../../utils/format/dateFormat";
function VenueDisplay({ venue }) {
  const { name, description, created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDate(created);

  return (
    <>
      <Grid>
        <Grid.Col>
          <Title>{name}</Title>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Description</Title>
          <Text>{description}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xl">{newDate}</Text>
          <Text size="xl">{formattedPrice} /night</Text>
          <Text size="xl">{maxGuests} guests</Text>
          <Button>Book</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default VenueDisplay;
