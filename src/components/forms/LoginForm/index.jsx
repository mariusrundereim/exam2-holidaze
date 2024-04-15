import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { login } from "../../../store/auth/authSlice";

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
      <h2>Login form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder="Email" />}
        />
        {errors.email && <span>This field is required</span>}

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input type="password" {...field} placeholder="Password" />
          )}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" value="Login" />
      </form>
    </>
  );
}

export default LoginForm;
