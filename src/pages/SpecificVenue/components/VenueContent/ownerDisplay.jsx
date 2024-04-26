import { Avatar, Flex, Title, Text } from "@mantine/core";
function OwnerDisplay({ venue }) {
  const { name, avatar } = venue.owner;
  return (
    <>
      <Flex
        mih={50}
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={4}>Owner</Title>
        <Avatar src={avatar.url} alt={avatar.alt} />
        <Text>{name}</Text>
      </Flex>
    </>
  );
}

export default OwnerDisplay;
