import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
  Title,
  Text,
  Container,
  Stepper,
  Group,
} from "@mantine/core";
import SelectCityAndCountry from "./selectCityAndCountry";
import { IconPhoto, IconTypography } from "@tabler/icons-react";
function VenueForm() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const venue = useSelector((state) => state.venues.selectedVenue);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      maxGuests: 0,
      media: [{ url: "", alt: "" }],
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

  // State for meta fields

  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  // Load and set venue data when venueId changes
  useEffect(() => {
    if (venueId) {
      if (!venue) {
        dispatch(fetchVenueById({ id: venueId }));
      } else {
        reset({
          name: venue.name,
          description: venue.description,
          price: venue.price,
          maxGuests: venue.maxGuests,
          media: venue.media,
          location: venue.location,
        });
        setMeta(venue.meta || {});
      }
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        maxGuests: 0,
        media: [{ url: "", alt: "" }],
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          contigent: "",
          lat: 0,
          lng: 0,
        },
      });
      setMeta({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      });
    }
  }, [venueId, venue, dispatch, reset]);

  const onSubmit = async (data) => {
    const fullData = { ...data, meta };
    if (venueId) {
      dispatch(updateVenue({ id: venueId, data: fullData }));
      navigate(`/venues/${venueId}/confirmed`);
    } else {
      try {
        const response = await dispatch(createVenue(fullData)).unwrap();
        const createdVenueId = response.data.id;
        navigate(`/venues/${createdVenueId}/confirmed`);
      } catch (error) {
        console.error("Failed to create venue:", error);
      }
    }
  };

  const handleMetaChange = (key, value) => {
    setMeta((prevMeta) => ({
      ...prevMeta,
      [key]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="Basic Info"
            description="Name, Price, Guests, Description"
          >
            <Grid gutter={40}>
              {/* Step 0 - Name, Price, Max Guests, Description*/}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input.Wrapper
                      label="Name"
                      description="Enter name of a venue"
                    >
                      <Input
                        {...field}
                        placeholder="Name"
                        value={field.value ?? ""}
                      />
                    </Input.Wrapper>
                  )}
                />
                {errors.name && <Text>Name is required</Text>}
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input.Wrapper
                      label="Price"
                      description="Give a price"
                      min={0}
                      withAsterisk
                    >
                      <NumberInput {...field} />
                    </Input.Wrapper>
                  )}
                />
                {errors.price && <Text>Price is required</Text>}
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
                {errors.maxGuests && <Text>Guests is required</Text>}
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
                {errors.description && <Text>Description is required</Text>}
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step label="Facilities" description="Available amenities">
            <Grid gutter={40}>
              {/* Step 1 - Facilities */}
              <Grid.Col span={6}>
                <Title order={4}>Facilities</Title>
                <Text>Select features</Text>
                <Stack>
                  <Controller
                    name="meta.wifi"
                    control={control}
                    render={({ field: { value } }) => (
                      <Switch
                        label="Wifi"
                        size="lg"
                        onLabel="Yes"
                        offLabel="No"
                        checked={meta.wifi}
                        onChange={(event) =>
                          handleMetaChange("wifi", event.currentTarget.checked)
                        }
                      />
                    )}
                  />

                  <Controller
                    name="meta.parking"
                    control={control}
                    render={({ field: { value } }) => (
                      <Switch
                        label="Parking"
                        size="lg"
                        onLabel="Yes"
                        offLabel="No"
                        checked={meta.parking}
                        onChange={(event) =>
                          handleMetaChange(
                            "parking",
                            event.currentTarget.checked
                          )
                        }
                      />
                    )}
                  />
                  <Controller
                    name="meta.breakfast"
                    control={control}
                    render={({ field: { value } }) => (
                      <Switch
                        label="Breakfast"
                        size="lg"
                        onLabel="Yes"
                        offLabel="No"
                        checked={meta.breakfast}
                        onChange={(event) =>
                          handleMetaChange(
                            "breakfast",
                            event.currentTarget.checked
                          )
                        }
                      />
                    )}
                  />
                  <Controller
                    name="meta.pets"
                    control={control}
                    render={({ field: { value } }) => (
                      <Switch
                        label="Pets"
                        size="lg"
                        onLabel="Yes"
                        offLabel="No"
                        checked={meta.pets}
                        onChange={(event) =>
                          handleMetaChange("pets", event.currentTarget.checked)
                        }
                      />
                    )}
                  />
                </Stack>
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step label="Location" description="City, Country, Address">
            <Grid gutter={40}>
              {/* Step 2 - Location */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack>
                  <SelectCityAndCountry control={control} setValue={setValue} />
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
                </Stack>
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step label="Media" description="Pictures">
            <Grid gutter={40}>
              {/* Step 3 - Pictures */}
              <Grid.Col>
                <Title order={4}>Pictures</Title>
                <Text>Up to 6 pictures. </Text>
                {fields.map((field, index) => (
                  <Grid key={field.id} gutter={10}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack>
                        <Controller
                          name={`media[${index}].url`}
                          control={control}
                          rules={{ required: "URL is required" }} // Add required rule with a message
                          render={({ field, fieldState: { error } }) => (
                            <Input.Wrapper label={`Picture URL #${index + 1}`}>
                              <Input
                                leftSection={<IconPhoto size={20} />}
                                placeholder="Enter media URL"
                                {...field}
                              />
                              {error && <Text>{error.message}</Text>}
                            </Input.Wrapper>
                          )}
                        />
                        <Button
                          variant="outline"
                          color="red"
                          fullWidth
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Controller
                        name={`media[${index}].alt`}
                        control={control}
                        render={({ field }) => (
                          <Input.Wrapper
                            label={`Describe your picture #${index + 1}`}
                          >
                            <Input
                              leftSection={<IconTypography size={20} />}
                              {...field}
                            />
                          </Input.Wrapper>
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      {index === fields.length - 1 && fields.length < 6 && (
                        <Grid.Col span={12}>
                          <Button onClick={() => append({ url: "", alt: "" })}>
                            Add media
                          </Button>
                        </Grid.Col>
                      )}
                    </Grid.Col>
                  </Grid>
                ))}
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Completed>
            <Text>All steps completed - you're ready to submit the form</Text>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep} disabled={active === 0}>
            Back
          </Button>
          {active === 3 ? (
            <Button type="submit">
              {venueId ? "Update Venue" : "Create Venue"}
            </Button>
          ) : (
            <Button onClick={nextStep}>Next step</Button>
          )}
        </Group>
      </form>
    </>
  );
}

export default VenueForm;
