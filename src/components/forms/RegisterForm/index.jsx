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
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

function RegisterForm() {
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
      venueManager: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, venueManager: checked };
      await dispatch(register(payload));
      props.onSuccess();
    } catch (error) {}
  };
  return (
    <>
      <Title order={3}>Sign up</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
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
        </Stack>
        <Stack>
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
        </Stack>
        <Group>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input type="password" {...field} placeholder="Password" />
            )}
          />
          {errors.password && <span>This field is required</span>}
        </Group>

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
      </form>
    </>
  );
}

export default RegisterForm;
