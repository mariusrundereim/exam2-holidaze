import { useDisclosure } from "@mantine/hooks";
import { Drawer, Image, Text, Button } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
function GalleryPicturesVenue({ venueId, media }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close} size="100%" title="Gallery">
        <h2>Gallery</h2>
        {media && media.length > 0 ? (
          media.map((item, index) => (
            <div key={index}>
              <Image src={item.url} alt={item.alt} />
              <Text align="center">{item.alt}</Text>
            </div>
          ))
        ) : (
          <Text>No media available</Text>
        )}
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
