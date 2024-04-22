import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { register } from "../../../store/auth/authSlice";
import { Grid, Input, Title, Text, Switch, Button, Group } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { setUserProfile } from "../../../store/auth/userSlice";
function RegisterForm() {
  const [checked, setChecked] = useState(false);

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

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    const payload = { ...data, venueManager: checked };
    dispatch(register(payload));
    console.log("payload", payload);
    console.log("diispatch", dispatch(register(payload)));
    console.log("daata", data);
  };
  return (
    <>
      <Title order={3}>Sign up</Title>
      <Grid grow>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid.Col>
            <Group>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    description="Text descrition"
                    placeholder="Placeholder"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.name && <Text>This field is required</Text>}
            </Group>
            <Group>
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
            </Group>
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
          </Grid.Col>
        </form>
      </Grid>
    </>
  );
}

export default RegisterForm;
