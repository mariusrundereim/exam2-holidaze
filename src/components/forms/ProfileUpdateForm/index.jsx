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
import {
  IconAt,
  IconUserCircle,
  IconLock,
  IconPhoto,
} from "@tabler/icons-react";
import { validImageFormat } from "../../../utils/format/imageFormat";
import { useProfileHandler } from "./useProfileHandler";

// import {
//   fetchProfileByName,
//   updateProfile,
// } from "../../../store/profile/profileSlice";

function ProfileUpdateForm() {
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
  };
  // const dispatch = useDispatch();
  // const [checked, setChecked] = useState(false);
  // const profileData = useSelector((state) => state.profile);
  // const profileName = profileData.name;

  // console.log("Current profile data:", profileData);

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     bio: profileData?.bio || "",
  //     avatar: { url: profileData?.avatar?.url || "" },
  //     banner: { url: profileData?.banner?.url || "" },
  //     venueManager: profileData?.venueManager || false,
  //   },
  // });
  // useEffect(() => {
  //   async function fetchAndSetProfile() {
  //     try {
  //       if (!profileName) {
  //         console.error("Profile name is undefined");
  //         return;
  //       }

  //       const response = await dispatch(
  //         fetchProfileByName(profileName)
  //       ).unwrap();
  //       console.log("Fetched profile response:", response);

  //       const data = response.data;
  //       const avatarUrl = data.avatar ? data.avatar.url : "";
  //       const bannerUrl = data.banner ? data.banner.url : "";

  //       reset({
  //         bio: data.bio,
  //         avatar: { url: avatarUrl },
  //         banner: { url: bannerUrl },
  //         venueManager: data.venueManager,
  //       });

  //       setChecked(data.venueManager);
  //     } catch (error) {
  //       console.error("Failed to fetch profile data", error);
  //     }
  //   }

  //   fetchAndSetProfile();
  // }, [dispatch, reset, profileName]);

  // const onSubmit = async (data) => {
  //   if (!profileData || !profileData.name) {
  //     console.error("Profile data is incomplete");
  //     return;
  //   }

  //   const processedData = {
  //     ...data,
  //     avatar: { url: data.avatar?.url || null },
  //     banner: { url: data.banner?.url || null },
  //     venueManager: checked,
  //   };

  //   console.log(processedData);

  //   try {
  //     const result = await dispatch(
  //       updateProfile({ profileName: profileData.name, data: processedData })
  //     ).unwrap();
  //     console.log("Update successful", result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
