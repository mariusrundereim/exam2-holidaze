import { useSelector } from "react-redux";
function VenueList() {
  const selectVenuesForCurrentProfile = (state) => {
    // Use venueIds from profile slice
    const venueIds = state.profile.venueIds;
    // Ensure we're correctly retrieving each venue from venuesById using IDs
    return venueIds.map((id) => state.venues.venuesById[id]);
  };

  const venues = useSelector(selectVenuesForCurrentProfile);
  console.log("List of venues by profile:", venues); // Updated log message for clarity

  return (
    <>
      <h2>Venue List here..</h2>
      {/* Optionally render venue details here */}
      {venues &&
        venues.map((venue) => (
          <div key={venue.id}>{venue.name}</div> // Example of rendering venue names
        ))}
    </>
  );
}

export default VenueList;
