import ImageCarousel from "./ImageCarousel";
import { Image } from "@mantine/core";
function VenueHeader({ venue }) {
  const firstImage = venue.media[0]?.url;
  return (
    <>
      <Image radius="md" h={600} src={firstImage} />
      {/* <ImageCarousel venue={venue} /> */}
    </>
  );
}

export default VenueHeader;
