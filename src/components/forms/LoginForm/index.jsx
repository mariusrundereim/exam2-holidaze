import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { login } from "../../../store/auth/authSlice";
import { Grid, Input, Title, Text, Switch, Button, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchFields = useWatch({
    control,
    name: ["password", "confirmPassword"],
  });

  const password = watchFields[0];
  const confirmPassword = watchFields[1];

  const onSubmit = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        const result = await dispatch(login(data));
      } else {
        console.error("Passwords do not match.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  }, [username, navigate]);

  return (
    <>
      <Title order={3} mb={20}>
        Login
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter={20}>
          <Grid.Col>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Wrapper label="Email" withAsterisk>
                  <Input {...field} placeholder="Email" />
                </Input.Wrapper>
              )}
            />
            {errors.email && <Text>This field is required</Text>}
          </Grid.Col>
          <Grid.Col>
            <Grid>
              <Grid.Col span={6}>
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
                      />
                    </Input.Wrapper>
                  )}
                />
                {errors.password && <span>This field is required</span>}
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords don't match.",
                  }}
                  render={({ field }) => (
                    <Input.Wrapper label="Confirm password" withAsterisk>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Password"
                      />
                    </Input.Wrapper>
                  )}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col>
            <Button type="submit">Login</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default LoginForm;
