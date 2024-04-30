import ImageCarousel from "./ImageCarousel";
import { Image } from "@mantine/core";
function VenueHeader({ venue }) {
  console.log("First media", venue.media[0].url);
  const firstImage = venue.media[0].url;
  return (
    <>
      <h2>Venue header</h2>
      <Image radius="md" h={200} src={firstImage} />
      <ImageCarousel venue={venue} />
    </>
  );
}

export default VenueHeader;
