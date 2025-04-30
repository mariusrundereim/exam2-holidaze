import {
  deleteBooking,
  updateBooking,
} from "../../../store/bookings/bookingSlice";

export const handleConfirmDelete = (dispatch, bookingId) => {
  dispatch(deleteBooking({ id: bookingId }));
};

export const handleUpdateBooking = (dispatch, bookingId, updateData) => {
  dispatch(updateBooking({ id: bookingId, data: updateData }));
};
