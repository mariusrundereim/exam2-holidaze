import {
  Avatar,
  Flex,
  Title,
  Text,
  Paper,
  Grid,
  Card,
  Badge,
  Stack,
} from "@mantine/core";
function OwnerDisplay({ venue }) {
  const { name, avatar } = venue.owner;
  return (
    <>
      <Card withBorder>
        <Avatar src={avatar.url} alt={avatar.alt} />
        <Text fw={600}>{name}</Text>
        <Badge>Owner</Badge>
      </Card>
    </>
  );
}

export default OwnerDisplay;
