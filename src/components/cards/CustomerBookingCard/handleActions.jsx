import { deleteBooking } from "../../../store/bookings/bookingSlice";

export const handleConfirmDelete = (dispatch, bookingId) => {
  dispatch(deleteBooking({ id: bookingId }));
};
