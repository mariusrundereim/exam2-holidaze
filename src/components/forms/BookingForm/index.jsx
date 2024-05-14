import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBooking } from "../../../store/bookings/bookingSlice";
import { Grid, Text, Title, Button, Input, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
function BookingForm() {
  const { venueId } = useParams();
  const dispatch = useDispatch();
  // const venue = useSelector((state) => state.venues.selectedVenue);

  const [value, setValue] = useState([null, null]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateFrom: "",
      dateTo: "",
      guests: 0,
      venueId: venueId,
    },
  });

  const onSubmit = (data) => {
    const newBooking = {
      ...data,
      dateFrom: value[0] ? value[0].toISOString() : null,
      dateTo: value[1] ? value[1].toISOString() : null,
      venueId,
    };
    console.log("Newbooking", newBooking);
    dispatch(createBooking(newBooking));
  };
  return (
    <>
      <Title>Booking</Title>
      <Text>{venueId}</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col>
            <Controller
              name="dateFrom"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <DatePicker
                    type="range"
                    value={value}
                    onChange={(val) => {
                      setValue(val);
                      field.onChange(val);
                    }}
                    hideOutsideDates
                  />
                </>
              )}
            />
            {errors.dateFrom && <Text>Date is required</Text>}
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="guests"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Guests" withAsterisk>
                  <NumberInput {...field} />
                </Input.Wrapper>
              )}
            />
            {errors.guests && <Text>Guests is required</Text>}
          </Grid.Col>
          <Grid.Col>
            <Button type="submit">Confirm Booking!</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default BookingForm;
