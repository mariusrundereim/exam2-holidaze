import { Container, Flex, Group } from "@mantine/core";
function ImageCarousel({ venue }) {
  const images = venue.media.map((image, index) => {
    return (
      <img
        key={index}
        src={image.url}
        alt={image.alt}
        style={{ width: "200px" }}
      />
    );
  });
  return (
    <>
      <Flex mih={10}>{images}</Flex>
    </>
  );
}

export default ImageCarousel;
