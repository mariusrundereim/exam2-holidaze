import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { login } from "../../../store/auth/authSlice";
import { Grid, Input, Title, Text, Switch, Button, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { email, password } = useSelector((state) => state.auth.credentials);
  const username = useSelector((state) => state.profile.name);
  console.log("username", username);
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

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (username) {
      navigate(`/profiles/${username}`);
    }
  }, [username, navigate]);

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
