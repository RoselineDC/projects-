import { useForm } from "react-hook-form";

export { useForm } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
    const { register, formState: { errors } } = useForm<SignInFormData>();
  return (
    <form className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Email Address
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("email", { required: "This field is required" })}
        ></input>
        {/* display error message */}
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <label className="text-sm text-gray-700 font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should be longer than 6 characters",
            },
          })}
        ></input>
        {/* display error message */}
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>
    </form>
  );
};

export default SignIn;
