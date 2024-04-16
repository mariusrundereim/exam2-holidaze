import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { login } from "../../../store/auth/authSlice";
import { Grid, Input, Title, Text, Switch, Button, Group } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    const payload = { ...data };
    dispatch(login(payload));
  };
  return (
    <>
      <Title order={3}>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} placeholder="Email" />}
        />
        {errors.email && <span>This field is required</span>}

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input type="password" {...field} placeholder="Password" />
          )}
        />
        {errors.password && <span>This field is required</span>}
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}

export default LoginForm;
