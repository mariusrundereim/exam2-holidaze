import {
  wifiMessage,
  parkingMessage,
  petsMessage,
  breakfastMessage,
} from "../../utils/displayMessages";

function AmenitiesDisplay({ meta }) {
  return (
    <>
      <h2>Amenities</h2>

      <p>Breakfast: {breakfastMessage(meta)}</p>
      <p>Parking: {parkingMessage(meta)}</p>
      <p>Pets: {petsMessage(meta)}</p>
      <p>WIFI: {wifiMessage(meta)}</p>
    </>
  );
}

export default AmenitiesDisplay;
