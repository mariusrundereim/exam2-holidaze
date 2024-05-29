import { Grid, Title, Text, Button, Group, Stack } from "@mantine/core";

function DescriptionVenue({ venue }) {
  const { description } = venue;
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={4} mb={10}>
            Description
          </Title>
          <Text>{description}</Text>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default DescriptionVenue;
