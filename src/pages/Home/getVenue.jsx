import { useDispatch } from "react-redux";
import VenuesCard from "../../components/cards/VenuesCard";
function SelectedVenues() {
  const dispatch = useDispatch();
  return (
    <>
      <h2>Selected venues</h2>
      <VenuesCard />
    </>
  );
}

export default SelectedVenues;
