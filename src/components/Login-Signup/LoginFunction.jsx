import axios from "axios";

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get the Authorization header
function getAuthHeader() {
  const authToken = sessionStorage.getItem("authToken") || "";
  return {
    Authorization: `Bearer ${authToken}`, // Use Authorization header instead of query params for security
  };
}

// Function to log in a user
export async function logUserIn(userCredentials) {
  try {
    const apiUrl = `${API_URL}/login`;
    const response = await axios.post(apiUrl, userCredentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Allow cookies if necessary
    });
    return response; // Return full response for further processing
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error; // Re-throw error to handle it in the caller function
  }
}

// Function to load user-specific routes
export async function loadRoutes() {
  try {
    const apiUrl = `${API_URL}/user/profile`;
    const response = await axios.get(apiUrl, {
      headers: getAuthHeader(),
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error(
      "Error loading routes:",
      error.response?.data || error.message
    );
    throw error; // Re-throw error to handle it in the caller function
  }
}

// Function to get current user details
export async function getCurrentUserDetails() {
  try {
    const apiUrl = `${API_URL}/user/profile`;
    const response = await axios.get(apiUrl, {
      headers: getAuthHeader(),
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response?.data || error.message
    );
    throw error; // Re-throw error to handle it in the caller function
  }
}

// import axios from "axios";

// export function logUserIn(userCredentials) {
//   const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
//   //  console.log("API URL:", apiUrl);
//   return axios.post(apiUrl, userCredentials, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

// export function loadRoutes() {
//   const authToken = sessionStorage.getItem("authToken") || "";
//   const apiUrl = `${
//     import.meta.env.VITE_API_URL
//   }/user/profile?secret_token=${authToken}`;
//   return axios.get(apiUrl);
// }

// export function getCurrentUserDetails(authToken) {
//   const apiUrl = `${
//     import.meta.env.VITE_API_URL
//   }/user/profile?secret_token=${authToken}`;
//   return axios.get(apiUrl);
// }
