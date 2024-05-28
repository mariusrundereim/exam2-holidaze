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
function RegisterForm({ onSuccess }) {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});
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
    const processedData = {
      ...data,
      avatar: data.avatar.url ? { url: data.avatar.url } : undefined,
      banner: data.banner.url ? { url: data.banner.url } : undefined,
      venueManager: checked,
    };

    console.log("Processed data for submission:", processedData);
    try {
      await dispatch(register(processedData)).unwrap();
      onSuccess();
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <>
      <Title order={3} mb={20}>
        Register
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter={40}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                },
              }}
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
            {errors.name && (
              <Text>
                Name must only contain letters, numbers, and underscores (_).
              </Text>
            )}
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
              <Text>Field supports only @stud.noroff.no email</Text>
            )}
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 8,
                },
              }}
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
            {errors.password && (
              <Text>The password value must be at least 8 characters.</Text>
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            <Controller
              name="avatar.url"
              control={control}
              rules={{
                validate: (value) =>
                  value === "" ||
                  validImageFormat(value) ||
                  "Invalid image URL",
              }}
              render={({ field, fieldState }) => (
                <Input.Wrapper label="Avatar">
                  <Input
                    {...field}
                    label="avatar.url"
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
              rules={{
                validate: (value) =>
                  value === "" ||
                  validImageFormat(value) ||
                  "Invalid image URL",
              }}
              render={({ field, fieldState }) => (
                <Input.Wrapper label="Banner">
                  <Input
                    label="banner.url"
                    {...field}
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
                />
              )}
            />
          </Grid.Col>

          <Grid.Col>
            <Controller
              name="bio"
              control={control}
              rules={{
                maxLength: {
                  value: 160,
                  message: "Bio must be less than 160 characters.",
                },
              }}
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
            {errors.bio && <Text>Biography max length is 160</Text>}
          </Grid.Col>

          <Grid.Col>
            <Button type="submit">Sign up</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default RegisterForm;
