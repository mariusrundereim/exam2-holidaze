import { useParams } from "react-router-dom";

function SpecificVenue() {
  const { venueId } = useParams();
  return (
    <>
      <h2>Specific Venue</h2>
      <h3>Venue id: {venueId}</h3>
    </>
  );
}

export default SpecificVenue;
