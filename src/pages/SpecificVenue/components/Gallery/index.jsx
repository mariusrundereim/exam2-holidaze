import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Image,
  Title,
  Text,
  Button,
  Container,
  Grid,
  Stack,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
function GalleryPicturesVenue({ venueId, media }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close} size="100%" title="Gallery">
        <Container fluid>
          <Grid>
            {media && media.length > 0 ? (
              media.map((item, index) => (
                <Grid.Col key={index}>
                  <Stack>
                    <Image src={item.url} alt={item.alt} />
                    <Text align="center">{item.alt}</Text>
                  </Stack>
                </Grid.Col>
              ))
            ) : (
              <Text>No media available</Text>
            )}
          </Grid>
        </Container>
      </Drawer>
      <Button
        variant="light"
        leftSection={<IconPhoto size={20} />}
        onClick={open}
      >
        Open gallery
      </Button>
    </>
  );
}

export default GalleryPicturesVenue;
