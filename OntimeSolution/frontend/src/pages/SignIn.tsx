import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export { useForm } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const queryClient = useQueryClient();
  //  import from appContext
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  // create fetch request
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {      
      // show toast
      showToast({
        message: "Sign In Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");

      // redirect to home page
      navigate("/");
    },
    // handle errors
    onError: (error: Error) => {
      // show toast for error
      showToast({
        message: error.message,
        type: "ERROR",
      });
      
    }
  });

  // handle submit
  const onSubmit = handleSubmit((data) => {
    // call mutation
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered? <Link className="underline" to="/register">Create an Account here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 hover:bg-blue-500 text-xl"
        >
          Login 
        </button>
      </span>
    </form>
  );
};

export default SignIn;
