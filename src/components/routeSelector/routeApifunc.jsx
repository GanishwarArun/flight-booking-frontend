import axios from "axios";

export async function getRoutesFromApi(startCity, destination) {
  const baseURL = `${import.meta.env.VITE_API_URL}/booking/`;

  try {
    const response = await axios.post(
      baseURL,
      { startCity, destination },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        timeout: 5000, // 5 second timeout
      }
    );

    if (response.data) {
      return response;
    }
    throw new Error("No data received");
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server Error:", {
        status: error.response.status,
        data: error.response.data,
      });
      throw new Error(error.response.data.message || "Server error");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error - No response received");
      throw new Error("Network error - please check your connection");
    } else {
      // Something happened in setting up the request
      console.error("Request Error:", error.message);
      throw new Error("Error setting up request");
    }
  }
}

// import axios from "axios";

// export async function getRoutesFromApi(startCity, destination) {
//     const baseURL = `${import.meta.env.VITE_API_URL}/booking/`;
//   // const baseURL =
//   //   "https://flight-booking-and-reservation.onrender.com/api/booking/";
//   try {
//     const response = await axios.post(baseURL, { startCity, destination });
//     return response.data; // Returns data if request is successful
//   } catch (error) {
//     console.error("Error fetching routes:", error.message);
//     return { error: error.response?.data || "Server error" }; // Provides error details
//   }
// }
