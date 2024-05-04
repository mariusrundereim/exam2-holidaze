import { useEffect } from "react";
import ListVenues from "./ListVenues";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../../store/venues/venueSlice";
import filterValidVenues from "../../utils/venues/filterVenues";
import VenueSearchBar from "./SearchBar";

function Explore() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.venues.loading);

  const filteredVenues = useSelector((state) => {
    const allVenues = state.venues.allVenuesList;
    return filterValidVenues(allVenues);
  });

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <VenueSearchBar />
      <ListVenues venues={filteredVenues} />
    </>
  );
}

export default Explore;
