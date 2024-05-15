import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListVenues from "./listVenues";
import filterValidVenues from "../../utils/venues/filterVenues";
import { fetchVenues } from "../../store/venues/venueSlice";
import { Button } from "@mantine/core";

function VenuesListPage() {
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
      <ListVenues venues={filteredVenues} />
      <Button>Button</Button>
    </>
  );
}

export default VenuesListPage;
