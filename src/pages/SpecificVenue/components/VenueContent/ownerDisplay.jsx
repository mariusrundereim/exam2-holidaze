import { Avatar, Flex, Title, Text, Paper } from "@mantine/core";
function OwnerDisplay({ venue }) {
  const { name, avatar } = venue.owner;
  return (
    <>
      <Paper shadow="xs" p="xl" withBorder>
        <Flex mih={50} align="center" direction="column" wrap="wrap">
          <Avatar src={avatar.url} alt={avatar.alt} />
          <Text>{name}</Text>
          <Title order={4}>Owner</Title>
        </Flex>
      </Paper>
    </>
  );
}

export default OwnerDisplay;
