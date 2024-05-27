import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Title, Text, Card, Button, Center } from "@mantine/core";
import { fetchVenueById } from "../../../store/venues/venueSlice";
import { formattedDateTime } from "../../../utils/format/dateFormat";

function VenueConfirmed() {
  const { venueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const venue = useSelector((state) => state.venues.selectedVenue);
  const loading = useSelector((state) => state.venues.loading);
  const userName = useSelector((state) => state.user.name);

  useEffect(() => {
    if (venueId) {
      dispatch(fetchVenueById({ id: venueId }));
    }
  }, [dispatch, venueId]);

  if (loading === "loading" || !venue) {
    return <p>Loading...</p>;
  }

  const handleClickVenue = () => {
    navigate(`/venues/${venueId}`);
  };

  const handleClickYourVenues = () => {
    navigate(`/profile/${userName}/venues`);
  };

  return (
    <>
      <Center mih={"100dvh"}>
        <Card>
          <Card.Section>
            <Title>Venues is created or updated!</Title>
            <Text>{venue.name}</Text>
          </Card.Section>
          <Card.Section>
            <Text>{venue.id}</Text>
            <Text>{formattedDateTime(venue.created)}</Text>
          </Card.Section>
          <Card.Section>
            <Button onClick={handleClickVenue}>Go to venue</Button>
            <Button onClick={handleClickYourVenues} variant="outline">
              Your venues
            </Button>
          </Card.Section>
        </Card>
      </Center>
    </>
  );
}

export default VenueConfirmed;
