import { Container } from "@mantine/core";
function ImageCarousel({ venue }) {
  const images = venue.media.map((image, index) => {
    return <img key={index} src={image.url} alt={image.alt} />;
  });
  return <>{images}</>;
}

export default ImageCarousel;
