import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { createVenue } from "../../../store/venues/venueSlice";
import {
  Grid,
  Stack,
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
    },
  });

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(createVenue(data));
      const venue = actionResult.payload;
      if (venue.data.id) {
        navigate(`/venues/${venue.data.id}`);
      }
      console.log("venue", actionResult);
      console.log("action:", actionResult);
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">Create venue</Button>
      </form>
    </>
  );
}

export default VenueForm;
