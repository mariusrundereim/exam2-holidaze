import VenuesList from "./VenuesList";
import { getVenuesByProfile } from "../../../store/venues/venueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Title } from "@mantine/core";
function VenueManagerSection() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const venues = useSelector((state) => {
    return state.venues.myCreatedVenues;
  });

  useEffect(() => {
    dispatch(getVenuesByProfile(profile.name));
  }, [dispatch, profile]);
  return (
    <>
      <Title order={3} mb={10}>
        Your venues
      </Title>
      <VenuesList venues={venues} />
    </>
  );
}

export default VenueManagerSection;
