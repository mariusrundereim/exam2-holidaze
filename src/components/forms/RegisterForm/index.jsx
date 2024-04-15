import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { register } from "../../../store/auth/authSlice";
function RegisterForm() {
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
    const payload = { ...data };
    dispatch(register(payload));
  };
  return (
    <>
      <h2>Register form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder="Name" />}
        />
        {errors.name && <span>This field is required</span>}

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

        <Controller
          name="venueManager"
          control={control}
          render={({ field }) => (
            <label>
              <input
                type="checkbox"
                {...field}
                value={field.value ? "true" : "false"}
              />{" "}
              Are you a venue manager?
            </label>
          )}
        />

        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default RegisterForm;
