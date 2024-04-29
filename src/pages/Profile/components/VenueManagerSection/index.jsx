import VenueList from "./VenueList";

function VenueManagerSection({ profile }) {
  console.log("What profile?", profile);
  return (
    <>
      <h2>Venue Manager Section</h2>
      <VenueList />
    </>
  );
}

export default VenueManagerSection;
