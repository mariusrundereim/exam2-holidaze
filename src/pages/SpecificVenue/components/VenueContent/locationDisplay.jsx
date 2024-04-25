import { addressMessage } from "../../utils/locationMessage";
function LocationDisplay({ location }) {
  return (
    <>
      <p>Location</p>
      <p>Address: {addressMessage(location)}</p>
    </>
  );
}

export default LocationDisplay;
