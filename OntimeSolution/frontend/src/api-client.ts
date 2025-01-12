import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// handle client server endpoints
export const register = async (formData: RegisterFormData) => {
  // fetch
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    // check if user is signed in
    credentials: "include",
    headers: {
      // body in json format
      "Content-Type": "application/json",
    },
    // proparties going in to the server/ form data
    body: JSON.stringify(formData),
  });

  // get body of response
  const responseBody = await response.json();

  //validate response
  if (!response.ok) {
    // throw error
    throw new Error(responseBody.message);
  }
};

// handle user login    THROGHAPI-CLIENT ENDPOINT
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  // get body of response
  const body = await response.json();
  // validate response
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};


// handle user login    THROGHAPI-CLIENT ENDPOINT
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    // method: "GET",
    credentials: "include",
  });
  // check response
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  // get response body
  return response.json();
};

// user logout
export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    // check response
    if (!response.ok) {
        throw new Error("Logout failed");
    }
    //
    return response.json();
};