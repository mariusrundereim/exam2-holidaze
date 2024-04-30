import { deleteVenue } from "../../../store/venues/venueSlice";
export const handleConfirmDelete = (dispatch, venueId) => {
  dispatch(deleteVenue({ id: venueId }));
};
