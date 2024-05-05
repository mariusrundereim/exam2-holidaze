import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register } from "../../../store/auth/authSlice";
import {
  Grid,
  Stack,
  Input,
  Title,
  Text,
  Switch,
  Button,
  Group,
  Textarea,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

function RegisterForm({ onSuccess, setActiveTab }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      banner: "",
      venueManager: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, venueManager: checked };
      await dispatch(register(payload)).unwrap();
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
        <Grid>
          <Grid.Col>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  description="Text descrition"
                  placeholder="Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.name && <Text>This field is required</Text>}
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email"
                  value={field.value}
                  onChange={field.onChange}
                  leftSection={<IconAt size={16} />}
                />
              )}
            />
            {errors.email && <span>This field is required</span>}
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="password" {...field} placeholder="Password" />
              )}
            />
            {errors.password && <span>This field is required</span>}
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

          <Grid.Col>
            <Controller
              name="avatar.url"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  label="avatar.url"
                  {...field}
                  placeholder="Enter url"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Grid.Col>

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

          <Button type="submit" fullWidth>
            Register
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default RegisterForm;
