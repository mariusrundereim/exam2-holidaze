import VenueList from "./VenueList";

function VenueManagerSection({ profile }) {
  return (
    <>
      <h2>Venue Manager Section</h2>
      <VenueList venues={profile.venues} />
    </>
  );
}

export default VenueManagerSection;
