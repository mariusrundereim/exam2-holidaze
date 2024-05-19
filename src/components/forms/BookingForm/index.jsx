import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../../../store/bookings/bookingSlice";
import {
  Grid,
  Text,
  Title,
  Button,
  Input,
  NumberInput,
  Container,
  Group,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { parseISO } from "date-fns";

import { handleDateBooked } from "./handleDateBooked";

import BookingVenueCard from "../../cards/BookingVenueCard";
function BookingForm() {
  const { venueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venue = useSelector((state) => state.venues.selectedVenue);
  const [value, setValue] = useState([null, null]);
  const [bookedDates, setBookedDates] = useState([]);

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

  useEffect(() => {
    if (venue && venue.bookings) {
      const dates = venue.bookings.map((booking) => ({
        dateFrom: parseISO(booking.dateFrom),
        dateTo: parseISO(booking.dateTo),
      }));
      setBookedDates(dates);
    }
  }, [venue]);

  const onSubmit = async (data) => {
    const newBooking = {
      ...data,
      dateFrom: value[0] ? value[0].toISOString() : null,
      dateTo: value[1] ? value[1].toISOString() : null,
      venueId,
    };
    console.log("Newbooking", newBooking);
    dispatch(createBooking(newBooking));
    navigate("confirmed");
  };
  return (
    <>
      <Container size="xl">
        <Grid>
          <Grid.Col>
            <Title>Booking</Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <BookingVenueCard venue={venue} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid.Col>
                  <Controller
                    name="dateFrom"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <DatePickerInput
                          type="range"
                          label="Pick date"
                          value={value}
                          onChange={(val) => {
                            setValue(val);
                            field.onChange(val);
                          }}
                          hideOutsideDates
                          excludeDate={(date) =>
                            handleDateBooked(date, bookedDates)
                          }
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
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default BookingForm;
