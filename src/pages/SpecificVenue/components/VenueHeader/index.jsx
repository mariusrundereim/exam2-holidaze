import { Image } from "@mantine/core";
function VenueHeader({ venue }) {
  const firstImage = venue.media[0]?.url;
  return (
    <>
      <Image radius="md" h={600} src={firstImage} />
    </>
  );
}

export default VenueHeader;
