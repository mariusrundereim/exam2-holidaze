import {
  Card,
  Title,
  Text,
  Button,
  Grid,
  Popover,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { formattedDateTime } from "../../../utils/format/dateFormat";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleConfirmDelete } from "./handleActions";
import {
  updateBooking,
  deleteBooking,
} from "../../../store/bookings/bookingSlice";

function CustomerBookingCard({ venue }) {
  const dispatch = useDispatch();
  const [updateOpened, setUpdateOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(venue.guests || 1);

  const {
    dateFrom,
    dateTo,
    id,
    venue: {
      id: venueId,
      name,
      location: { address, city },
    },
  } = venue;

  const loading = useSelector((state) => state.booking.loading);

  // Handle update booking
  const handleUpdateBooking = () => {
    const updateData = {};

    if (dateRange[0] && dateRange[1]) {
      updateData.dateFrom = dateRange[0].toISOString();
      updateData.dateTo = dateRange[1].toISOString();
    }

    if (guests !== venue.guests) {
      updateData.guests = parseInt(guests);
    }

    if (Object.keys(updateData).length > 0) {
      dispatch(updateBooking({ id, data: updateData }))
        .unwrap()
        .then(() => {
          setUpdateOpened(false);
        })
        .catch((error) => {
          console.error("Failed to update booking:", error);
        });
    }
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p={10}>
          <Grid>
            <Grid.Col>
              <Link
                to={`/venues/${venueId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Title
                  order={3}
                  style={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {name}
                </Title>
              </Link>

              <Text>
                {address}, {city}
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>From: {formattedDateTime(dateFrom)}</Text>
              <Text>To: {formattedDateTime(dateTo)}</Text>
            </Grid.Col>
            <Grid.Col>
              <Text>Booking ID: {id}</Text>
              <Text>Guests: {venue.guests}</Text>
            </Grid.Col>
            <Grid.Col>
              <Group>
                <Popover
                  width={300}
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={updateOpened}
                  onChange={setUpdateOpened}
                >
                  <Popover.Target>
                    <Button onClick={() => setUpdateOpened(true)}>
                      UPDATE BOOKING
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack>
                      <Title order={5}>Update Booking</Title>
                      <DatePickerInput
                        type="range"
                        label="Update dates"
                        placeholder="Pick dates"
                        value={dateRange}
                        onChange={setDateRange}
                      />
                      <TextInput
                        label="Guests"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min={1}
                      />
                      <Button onClick={handleUpdateBooking}>Update</Button>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>

                <Popover
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={deleteOpened}
                  onChange={setDeleteOpened}
                >
                  <Popover.Target>
                    <Button color="red" onClick={() => setDeleteOpened(true)}>
                      DELETE BOOKING
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack>
                      <Text ta="center">
                        Are you sure you want to delete this booking?
                      </Text>
                      <Button
                        color="red"
                        onClick={() => {
                          handleConfirmDelete(dispatch, id);
                          setDeleteOpened(false);
                        }}
                      >
                        Delete permanently
                      </Button>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default CustomerBookingCard;
