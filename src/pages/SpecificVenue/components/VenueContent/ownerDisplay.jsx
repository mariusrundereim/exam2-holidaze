import { Avatar, Title, Text, Grid, Group } from "@mantine/core";
function OwnerDisplay({ venue }) {
  const { name, avatar } = venue.owner;
  return (
    <>
      <Grid>
        <Grid.Col>
          <Title order={4} mb={10}>
            Venue owner
          </Title>
          <Group>
            <Avatar src={avatar.url} alt={avatar.alt} />
            <Text>{name}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default OwnerDisplay;
