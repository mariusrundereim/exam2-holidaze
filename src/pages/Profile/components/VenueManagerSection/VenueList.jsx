import { useSelector } from "react-redux";
function VenueList() {
  const selectVenuesForCurrentProfile = (state) => {
    const venueIds = state.profile.venues;
    return venueIds.map((id) => state.venues.venuesById[id]);
  };

  const venues = useSelector(selectVenuesForCurrentProfile);
  console.log("Where is list of venues by profile? The list is empty", venues);
  return (
    <>
      <h2>Venue List here..</h2>
    </>
  );
}

export default VenueList;

// import { useDispatch, useSelector } from "react-redux";
// // import { getVenuesByProfile } from "../../../../store/venues/venueSlice"; // Adjust import path if needed
// import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react"; // Import useState for loading state

// function VenueList() {
//   const dispatch = useDispatch();
//   const { profileName } = useParams();
//   const venuesById = useSelector((state) => state.venues.venuesById);
//   const profileVenues = useSelector((state) => state.profile.venues); // Assuming venue IDs are here
//   const [isLoading, setIsLoading] = useState(false);
//   const [venues, setVenues] = useState([]); // Array to hold fetched venues

//   useEffect(() => {
//     const fetchVenues = async () => {
//       setIsLoading(true);
//       await dispatch(getVenuesByProfile(profileName));
//       setIsLoading(false);
//     };

//     fetchVenues();
//   }, [dispatch, profileName]);

//   useEffect(() => {
//     const fetchedVenues = profileVenues.map((venueId) => venuesById[venueId]);
//     setVenues(fetchedVenues);
//   }, [profileVenues, venuesById]);

//   return (
//     <>
//       <h3>Venue List</h3>
//       {isLoading ? (
//         <p>Loading venues...</p>
//       ) : venues.length === 0 ? (
//         <ul>
//           {venues.map((venue) => (
//             <li key={venue._id}>{venue.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No venues found for this profile.</p>
//       )}
//     </>
//   );
// }

// export default VenueList;
