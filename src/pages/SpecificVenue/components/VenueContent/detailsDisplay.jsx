import { Grid, Title, Text, Button, Group, Stack } from "@mantine/core";

import formatCurrency from "../../../../utils/format/currencyFormat";
import { formattedDate } from "../../../../utils/format/dateFormat";

function DetailsVenue({ venue }) {
  const { created, maxGuests, price } = venue;
  const formattedPrice = formatCurrency(price);
  const newDate = formattedDate(created);

  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={4} mb={10}>
            Information
          </Title>

          <Stack gap="xs">
            <Text size="xl">{formattedPrice} /night</Text>
            <Text size="xl">{maxGuests} guests</Text>
            <Text size="xl">Created: {newDate}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default DetailsVenue;
