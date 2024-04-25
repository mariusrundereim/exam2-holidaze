import {
  addressMessage,
  cityMessage,
  countryMessage,
  continentMessage,
  zipMessage,
} from "../../utils/displayMessages";
function LocationDisplay({ location }) {
  return (
    <>
      <p>Location</p>
      <p>Address: {addressMessage(location)}</p>
      <p>City: {cityMessage(location)}</p>
      <p>Country: {countryMessage(location)}</p>
      <p>Continent: {continentMessage(location)}</p>
      <p>Zip: {zipMessage(location)}</p>
    </>
  );
}

export default LocationDisplay;
