// handle user logout

import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    // add logic to validate refesh token
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            // invalidate query
            await queryClient.invalidateQueries("validateToken");
            // show toast
            showToast({
                message: "Sign Out Successful",
                type: "SUCCESS",
            });
            // redirect to home page
            // navigate("/register");
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
    // handle click
    const handleClick = () => {
        mutation.mutate();
    };
    return(
        <button onClick={handleClick} className="text-blue-6000 px-3 font-bold bg-white hover:bg-gray-100">
            Sign Out
        </button>
    );
};

export default SignOutButton;