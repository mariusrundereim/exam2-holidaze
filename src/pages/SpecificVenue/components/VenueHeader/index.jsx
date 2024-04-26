import ImageCarousel from "./ImageCarousel";

function VenueHeader({ venue }) {
  return (
    <>
      <h2>Venue header</h2>
      <ImageCarousel venue={venue} />
    </>
  );
}

export default VenueHeader;
