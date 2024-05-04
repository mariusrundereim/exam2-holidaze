import { deleteVenue, fetchVenueById } from "../../../store/venues/venueSlice";
export const handleConfirmDelete = (dispatch, venueId) => {
  dispatch(deleteVenue({ id: venueId }));
};

export const handleEditButton = (venueId) => (dispatch) => {
  console.log("venueId", venueId);
  return dispatch(fetchVenueById({ id: venueId }));
};
