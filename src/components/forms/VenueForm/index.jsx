import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  createVenue,
  updateVenue,
  fetchVenueById,
} from "../../../store/venues/venueSlice";
import {
  Grid,
  Stack,
  Input,
  Switch,
  Button,
  Textarea,
  NumberInput,
} from "@mantine/core";
function VenueForm() {
  const { venueId } = useParams();
  const dispatch = useDispatch();
  const venue = useSelector((state) => state.venues.selectedVenue);
  // const venue = useSelector((state) =>
  //   state.venues.allVenuesList.find((v) => v.id === venueId)
  // );

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: venue ? venue.name : "",
      description: venue ? venue.description : "",
      price: venue ? venue.price : 0,
      maxGuests: venue ? venue.maxGuests : 0,

      media: venue ? venue.media : [{ url: "" }],
      location: venue
        ? venue.location
        : {
            address: "",
            city: "",
            zip: "",
            country: "",
            contigent: "",
            lat: 0,
            lng: 0,
          },
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "media" });

  // Load and set venue data when venueId changes
  useEffect(() => {
    if (venueId && !venue) {
      dispatch(fetchVenueById({ id: venueId }));
    } else if (venue) {
      reset({
        name: venue.name,
        description: venue.description,
        price: venue.price,
        maxGuests: venue.maxGuests,
        media: venue.media,
        location: venue.location,
      });
    }
  }, [venueId, venue, dispatch, reset]);

  const onSubmit = (data) => {
    if (venue) {
      dispatch(updateVenue({ id: venue.id, data }));
    } else {
      dispatch(createVenue(data));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Name" description="Enter name of a venue">
                  <Input {...register("name")} placeholder="Name" />
                </Input.Wrapper>
              )}
            />
            {errors.name && <span>Name is required</span>}
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper
                  label="Price"
                  description="Give a price"
                  withAsterisk
                >
                  <NumberInput {...field} />
                </Input.Wrapper>
              )}
            />
            {errors.price && <span>Price is required</span>}
            <Controller
              name="maxGuests"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper
                  label="Max guests"
                  description="How many?"
                  withAsterisk
                >
                  <NumberInput {...field} />
                </Input.Wrapper>
              )}
            />
            {errors.maxGuests && <span>Guests is required</span>}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  description="Describe your venue"
                  autosize
                  minRows={8}
                  maxRows={10}
                  withAsterisk
                />
              )}
            />
            {errors.description && <span>Description is required</span>}
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="meta.wifi"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label="Wifi"
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  checked={value}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            <Controller
              name="meta.parking"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label="Parking"
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  checked={value}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            <Controller
              name="meta.breakfast"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label="Breakfast"
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  checked={value}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            <Controller
              name="meta.pets"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label="Pets"
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  checked={value}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="location.address"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.Wrapper label="Address">
                  <Input {...field} placeholder="Address" />
                </Input.Wrapper>
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="location.city"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.Wrapper label="City">
                  <Input {...field} placeholder="City" />
                </Input.Wrapper>
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="location.zip"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.Wrapper label="Zip">
                  <Input {...field} placeholder="Zip" />
                </Input.Wrapper>
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="location.country"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.Wrapper label="Country">
                  <Input {...field} placeholder="Country" />
                </Input.Wrapper>
              )}
            />
          </Grid.Col>
          <Grid.Col>
            {fields.map((field, index) => (
              <Grid key={field.id} gutter={10}>
                <Grid.Col>
                  <Controller
                    name={`media[${index}].url`}
                    control={control}
                    render={({ field }) => (
                      <Input.Wrapper label={`Media URL ${index + 1}`}>
                        <Input {...field} />
                      </Input.Wrapper>
                    )}
                  />
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Grid.Col>
                <Grid.Col>
                  {fields.length < 6 && (
                    <Button onClick={() => append({ url: "" })}>
                      Add media
                    </Button>
                  )}
                </Grid.Col>
              </Grid>
            ))}
          </Grid.Col>

          <Stack></Stack>
          <Grid.Col>
            <Button type="submit">
              {venueId ? "Update Venue" : "Create Venue"}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default VenueForm;
