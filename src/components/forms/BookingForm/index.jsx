import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBooking } from "../../../store/bookings/bookingSlice";

function BookingForm() {
  const { venueId } = useParams();
  const dispatch = useDispatch();

  const venue = useSelector((state) => state.venues.selectedVenue);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateFrom: "",
      dateTo: "",
    },
  });

  const onSubmit = (data) => {
    const newBooking = {
      ...data,
      venueId,
    };
    dispatch(createBooking(newBooking));
  };
  return (
    <>
      <h4>Here comes the booking form</h4>
    </>
  );
}

export default BookingForm;
