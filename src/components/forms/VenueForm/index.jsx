import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { createVenue } from "../../../store/venues/venueSlice";
import {
  Grid,
  Stack,
  Flex,
  Input,
  Title,
  Text,
  Switch,
  Button,
  Group,
  NumberInput,
} from "@mantine/core";

function VenueForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      maxGuests: 0,

      media: [{ url: "" }],
      location: {
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

  const onSubmit = async (data) => {
    try {
      console.log("before", data);
      console.log("after", createVenue(data));
      console.log("Test", await dispatch(createVenue(data)));

      // const actionResult = await dispatch(createVenue(data));
      // const venue = actionResult.payload;
      // console.log("new", venue);
      // if (venue.data.id) {
      //   navigate(`/venues/${venue.data.id}`);
      // }
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title order={3}>Step 0</Title>
        <Stack>
          <Stack>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Name" description="Enter name of a venue">
                  <Input {...field} placeholder="Name" />
                </Input.Wrapper>
              )}
            />
            {errors.name && <span>Name is required</span>}
          </Stack>
          <Stack>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper
                  label="Description"
                  description="Describe your venue"
                  withAsterisk
                >
                  <Input {...field} placeholder="Description" />
                </Input.Wrapper>
              )}
            />
            {errors.description && <span>Description is required</span>}
          </Stack>
          <Stack>
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
          </Stack>
          <Stack>
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
          </Stack>
        </Stack>
        <Title order={3}>Step 1</Title>
        <Stack>
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
        </Stack>
        <Title order={3}>Step 2</Title>
        <Stack>
          <Controller
            name="location.address"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input.Wrapper label="Address" description="Fill inn address">
                <Input {...field} placeholder="Address" />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="location.city"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input.Wrapper label="City" description="Fill inn city">
                <Input {...field} placeholder="City" />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="location.zip"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input.Wrapper label="Zip" description="Fill inn zip">
                <Input {...field} placeholder="Zip" />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="location.country"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input.Wrapper label="Country" description="Fill inn country">
                <Input {...field} placeholder="Country" />
              </Input.Wrapper>
            )}
          />
        </Stack>
        <Title order={3}>Step 3</Title>
        <Stack>
          {fields.map((field, index) => (
            <Grid key={field.id}>
              <Grid.Col span={10}>
                <Controller
                  name={`media[${index}].url`}
                  control={control}
                  render={({ field }) => (
                    <Input.Wrapper label={`Media URL ${index + 1}`}>
                      <Input {...field} />
                    </Input.Wrapper>
                  )}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Button onClick={() => remove(index)}>Remove</Button>
              </Grid.Col>
            </Grid>
          ))}
          {fields.length < 6 && (
            <Button onClick={() => append({ url: "" })}>Add media</Button>
          )}
        </Stack>
        <Button type="submit">Create venue</Button>
      </form>
    </>
  );
}

export default VenueForm;
