import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { register } from "../../../store/auth/authSlice";
import {
  Grid,
  Input,
  Title,
  Text,
  Switch,
  Button,
  Textarea,
} from "@mantine/core";
import {
  IconAt,
  IconUserCircle,
  IconLock,
  IconPhoto,
} from "@tabler/icons-react";
import { validImageFormat } from "../../../utils/format/imageFormat";

function ProfileUpdateForm() {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
      avatar: { url: "" },
      banner: { url: "" },
      venueManager: false,
    },
  });

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      avatar: { url: data.avatar.url || null },
      banner: { url: data.banner.url || null },
      venueManager: checked,
    };

    console.log("Processed data for submission:", processedData);
    try {
      await dispatch(register(processedData)).unwrap();
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col>
            <Controller
              name="bio"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Textarea
                  label="Bio"
                  {...field}
                  autosize
                  minRows={4}
                  maxRows={6}
                />
              )}
            />
            {errors.bio && <Text>This field is required</Text>}
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="avatar.url"
              control={control}
              rules={{ validate: validImageFormat }}
              render={({ field, fieldState }) => (
                <Input.Wrapper label="Avatar">
                  <Input
                    {...field}
                    label="avatar.url"
                    placeholder="Enter url"
                    value={field.value || ""}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    leftSection={<IconPhoto size={18} />}
                  />
                </Input.Wrapper>
              )}
            />
            {errors.avatar && <Text>This field is required</Text>}
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="banner.url"
              control={control}
              rules={{ validate: validImageFormat }}
              render={({ field, fieldState }) => (
                <Input.Wrapper label="Banner">
                  <Input
                    label="banner.url"
                    {...field}
                    placeholder="Enter url"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    leftSection={<IconPhoto size={18} />}
                  />
                </Input.Wrapper>
              )}
            />
          </Grid.Col>

          <Grid.Col>
            <Controller
              name="venueManager"
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={checked}
                  label="Venue manager"
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  size="md"
                  onLabel="Yes"
                  offLabel="No"
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Button>Update profile</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default ProfileUpdateForm;
