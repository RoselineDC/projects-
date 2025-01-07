import { RegisterFormData } from "./pages/register";


const API_BASE_URL =import.meta.env.VITE_API_BASE_URL as string;

// handle client server endpoints 
export const register = async (formData: RegisterFormData) => {
    // fetch 
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
            // body in json format
            "Content-Type": "application/json"
        },
        // proparties going in to the server/ form data
        body: JSON.stringify(formData)
    });

    // get body of response
    const responseBody = await response.json();
    
    //validate response
    if(!response.ok){
        // throw error
        throw new Error(responseBody.message);
    }

};