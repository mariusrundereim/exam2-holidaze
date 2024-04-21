import { useParams } from "react-router-dom";
// import { useGetVenueByIdQuery } from "../../store/api/apiSlice";
function SpecificVenue() {
  // let params = useParams();
  // console.log(params.venueId);
  // const { venueId } = useParams();
  // const {
  //   data: venue,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useGetVenueByIdQuery({ id: venueId, owner: true });

  // if (!venueId) {
  //   return null;
  // }

  // if (isLoading || !venueId) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>An error occurred while fetching venue data</div>;
  // }

  return (
    <>
      <h2>Specific Venue</h2>
      <h3>Venue id: {venueId}</h3>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
    </>
  );
}

export default SpecificVenue;
