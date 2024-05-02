import { deleteVenue, fetchVenueById } from "../../../store/venues/venueSlice";
export const handleConfirmDelete = (dispatch, venueId) => {
  dispatch(deleteVenue({ id: venueId }));
};

export const handleEditButton = (venueId) => (dispatch) => {
  dispatch(fetchVenueById(venueId));
};
