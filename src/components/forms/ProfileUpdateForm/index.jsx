import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Input,
  Title,
  Text,
  Switch,
  Button,
  Textarea,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { validImageFormat } from "../../../utils/format/imageFormat";
import { useProfileHandler } from "./useProfileHandler";
import { useNavigate } from "react-router-dom";

function ProfileUpdateForm() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
      avatar: { url: "" },
      banner: { url: "" },
      venueManager: false,
    },
  });

  const { profileData, checked, setChecked, profileName, handleSubmitProfile } =
    useProfileHandler(reset);

  const onSubmit = (data) => {
    handleSubmitProfile(data);
    navigate(`/profile/${username}`);
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
            <Button type="submit">Update profile</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default ProfileUpdateForm;
