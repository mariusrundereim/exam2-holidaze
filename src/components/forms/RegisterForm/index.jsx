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
function RegisterForm({ onSuccess, setActiveTab }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      avatar: { url: "" },
      banner: { url: "" },
      venueManager: false,
    },
  });

  const onSubmit = async (data) => {
    // Adjust data to convert empty strings to null or another expected value
    const processedData = {
      ...data,
      avatar: { url: data.avatar.url || null },
      banner: { url: data.banner.url || null },
      venueManager: checked,
    };

    console.log("Processed data for submission:", processedData);
    try {
      await dispatch(register(processedData)).unwrap();
      setActiveTab("login");
      onSuccess();
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <>
      <Title order={3}>Sign up</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Name" withAsterisk>
                  <Input
                    {...field}
                    label="name"
                    placeholder="Name"
                    value={field.value}
                    onChange={field.onChange}
                    leftSection={<IconUserCircle size={18} />}
                  />
                </Input.Wrapper>
              )}
            />
            {errors.name && <Text>This field is required</Text>}
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /^[^@]+@stud\.noroff\.no$/i }}
              render={({ field }) => (
                <Input.Wrapper label="Email" withAsterisk>
                  <Input
                    {...field}
                    placeholder="Email"
                    value={field.value}
                    onChange={field.onChange}
                    leftSection={<IconAt size={18} />}
                  />
                </Input.Wrapper>
              )}
            />
            {errors.email && (
              <span>Field supports only @stud.noroff.no email</span>
            )}
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Password" withAsterisk>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Password"
                    leftSection={<IconLock size={18} />}
                  />
                </Input.Wrapper>
              )}
            />
            {errors.password && <span>This field is required</span>}
          </Grid.Col>

          <Grid.Col span={6}>
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
            <Controller
              name="venueManager"
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={checked}
                  label="Venue manager?"
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  size="md"
                  onLabel="Yes"
                  offLabel="No"
                />
              )}
            />
          </Grid.Col>

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
                  minRows={2}
                  maxRows={4}
                />
              )}
            />
          </Grid.Col>

          <Button type="submit" fullWidth>
            Register
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default RegisterForm;
