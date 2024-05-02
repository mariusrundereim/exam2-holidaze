import { deleteVenue, updateVenue } from "../../../store/venues/venueSlice";
export const handleConfirmDelete = (dispatch, venueId) => {
  dispatch(deleteVenue({ id: venueId }));
};

export const handleEditButton = (venueId) => {
  dispatch(updateVenue(venueId));
};
