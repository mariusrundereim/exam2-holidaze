import ImageCarousel from "./components/ImageCarousel";

function VenueHeader({ venue }) {
  console.log("images", venue.media);

  return (
    <>
      <h2>Venue header</h2>
      <ImageCarousel venue={venue} />
    </>
  );
}

export default VenueHeader;
