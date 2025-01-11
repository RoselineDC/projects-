// user registration

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const { register, watch, handleSubmit, formState: {
        errors
    } } = useForm<RegisterFormData>();
    // usng react quir
    const mutation = useMutation(apiClient.register, {
        // on success register
        onSuccess: () => {
            showToast({
                message: "Registration Successful",
                type: "SUCCESS"
            });
            // navigate to login page
            navigate("/");
        },
        // on error
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            });
        }

    });

    // handle submit errors
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            {/* flex field */}
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-sm text-gray-700 font-bold flex-1">
                    First Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal " type="text"
                        {...register("firstName", { required: "This field is required" })}>
                    </input>
                    {/* display error message */}
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className="text-sm text-gray-700 font-bold flex-1">
                    lastName
                    <input
                        className="border rounded w-full py-1 px-2 font-normal " type="text"
                        {...register("lastName", { required: "This field is required" })}>
                    </input>
                    {/* display error message */}
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
            <label className="text-sm text-gray-700 font-bold flex-1">
                Email Address
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal "
                    {...register("email", { required: "This field is required" })}>
                </input>
                {/* display error message */}
                {errors.email && (
                    <span className="text-red-500 text-sm">
                        {errors.email.message}
                    </span>
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
                            message: "Password should be longer than 6 characters"
                        }
                    })}>
                </input>
                {/* display error message */}
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message}
                    </span>
                )}
            </label>
            <label className="text-sm text-gray-700 font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal "
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            }
                            // check if password match 
                            else if (watch("password") !== val) {
                                return "Your password do not match";
                            }

                        }
                    })}>

                </input>
                {/* display error message */}
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>
            {/* add button  */}
            <span>
                <button type="submit" className="bg-blue-600 text-white font-bold py-2 hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>


        </form>
    );

};

export default Register;
