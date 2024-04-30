import { useMemo } from "react";
import { getVenuesByProfile } from "../../../../store/venues/venueSlice";
import { useSelector, shallowEqual } from "react-redux";
function VenueList() {
  const venueIds = useSelector((state) => state.profile.venueIds, shallowEqual);
  const venuesById = useSelector(
    (state) => state.venues.venuesById,
    shallowEqual
  );

  const venues = useMemo(() => {
    console.log("venues from IDs");
    return venueIds.map((id) => venuesById[id]);
  }, [venueIds, venuesById]);

  console.log("List of venues by profile:", venues);

  return (
    <>
      <h2>Your venues</h2>
      {venues && venues.map((venue) => <div key={venue.id}>{venue.name}</div>)}
    </>
  );
}

export default VenueList;
