import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import BusList from "../BusList/BusList";

export default function RouteSelector() {
  const [dataInp, setDataInp] = useState([]);
  const [startCity, setStartCity] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRoutes = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!startCity || !destination || !selectedDate) {
      setError("All fields ('From', 'To', and 'Date') must be selected.");
      setIsLoading(false);
      return;
    }

    try {
      // Formatting the date to MM/DD/YYYY to send to the backend
      const formattedDate = dayjs(selectedDate).format("MM/DD/YYYY");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking/`,
        {
          startCity,
          destination,
          departureDate: formattedDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.buses) {
        console.log("Backend response buses:", response.data.buses);

        // Map backend buses to make sure they use consistent field names
        const buses = response.data.buses.map((bus) => ({
          ...bus,
          companyName: bus.CompanyName, // Rename backend field to frontend name
        }));

        // Debugging the date format to ensure consistency
        const filteredBuses = buses.filter((bus) => {
          const backendDate = dayjs(bus.date, "DD/MM/YYYY"); // Explicitly tell dayjs how to parse the backend date
          const selectedFormattedDate = dayjs(selectedDate, "YYYY-MM-DD"); // Frontend selected date format

          // Log the dates for debugging
          console.log("Backend Date:", backendDate.format("DD/MM/YYYY"));
          console.log(
            "Selected Date:",
            selectedFormattedDate.format("DD/MM/YYYY")
          );

          // Compare the dates by day level
          return backendDate.isSame(selectedFormattedDate, "day");
        });

        console.log("Filtered Buses:", filteredBuses);

        // Update the state with filtered buses
        setDataInp(filteredBuses);

        if (filteredBuses.length === 0) {
          setError("No buses found for the selected route and date.");
        }
      } else {
        setError("No buses found for the selected route.");
      }
    } catch (err) {
      console.error("Error fetching routes:", err.message);
      setError("Failed to fetch bus routes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderBusList = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (dataInp.length > 0) {
      return <BusList buses={dataInp} />;
    }
    return <p>No results to display. Select a route and click "Get Routes".</p>;
  };

  return (
    <div className="p-5 bg-blue-300 border border-blue-500 rounded-md">
      <div className="max-w-md mx-auto">
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={getRoutes}
        >
          <select
            onChange={(e) => setStartCity(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">FROM</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <select
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">TO</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>

          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Get Routes
          </button>
        </form>

        <div className="mt-4">{renderBusList()}</div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import BusList from "../BusList/BusList";

// export default function RouteSelector() {
//   const [dataInp, setDataInp] = useState([]);
//   const [startCity, setStartCity] = useState("");
//   const [destination, setDestination] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const getRoutes = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!startCity || !destination || !selectedDate) {
//       setError("All fields ('From', 'To', and 'Date') must be selected.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Sending date in MM/DD/YYYY format to match backend logic
//       const formattedDate = dayjs(selectedDate).format("MM/DD/YYYY");

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/booking/`,
//         {
//           startCity,
//           destination,
//           departureDate: formattedDate,
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.data && response.data.buses) {
//         console.log("Backend response buses:", response.data.buses); // Debugging

//         // Map backend fields to frontend-compatible structure
//         const buses = response.data.buses.map((bus) => ({
//           ...bus,
//           companyName: bus.CompanyName, // Map CompanyName to companyName
//         }));

//         // Corrected filtering logic
//         const filteredBuses = buses.filter((bus) => {
//           // Parse backend date with format explicitly
//           const backendDate = dayjs(bus.date, "DD/MM/YYYY");
//           // Format selected date for comparison
//           const selectedDateFormatted =
//             dayjs(selectedDate).format("DD/MM/YYYY");

//           console.log("Backend Date:", backendDate.format("DD/MM/YYYY")); // Debugging
//           console.log("Selected Date:", selectedDateFormatted); // Debugging

//           return backendDate.isSame(selectedDateFormatted, "day");
//         });

//         console.log("Filtered Buses:", filteredBuses); // Debugging
//         setDataInp(filteredBuses);

//         if (filteredBuses.length === 0) {
//           setError("No buses found for the selected route and date.");
//         }
//       } else {
//         setError("No buses found for the selected route.");
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err.message);
//       setError("Failed to fetch bus routes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderBusList = () => {
//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (dataInp.length > 0) {
//       return <BusList buses={dataInp} />;
//     }
//     return <p>No results to display. Select a route and click "Get Routes".</p>;
//   };

//   return (
//     <div className="p-5 bg-blue-300 border border-blue-500 rounded-md">
//       <div className="max-w-md mx-auto">
//         <form
//           className="flex flex-col items-center space-y-4"
//           onSubmit={getRoutes}
//         >
//           <select
//             onChange={(e) => setStartCity(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">FROM</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>

//           <select
//             onChange={(e) => setDestination(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">TO</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//           </select>

//           <input
//             type="date"
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             Get Routes
//           </button>
//         </form>

//         <div className="mt-4">{renderBusList()}</div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import BusList from "../BusList/BusList";

// export default function RouteSelector() {
//   const [dataInp, setDataInp] = useState([]);
//   const [startCity, setStartCity] = useState("");
//   const [destination, setDestination] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const getRoutes = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!startCity || !destination || !selectedDate) {
//       setError("All fields ('From', 'To', and 'Date') must be selected.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Sending date in MM/DD/YYYY format to match the backend logic
//       const formattedDate = dayjs(selectedDate).format("MM/DD/YYYY");

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/booking/`,
//         {
//           startCity,
//           destination,
//           departureDate: formattedDate, // Pass formatted date here

//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.data && response.data.buses) {
//         console.log("Backend response buses:", response.data.buses); // Debugging

//         // Map backend fields to frontend-compatible structure
//         const buses = response.data.buses.map((bus) => ({
//           ...bus,
//           companyName: bus.CompanyName, // Map CompanyName to companyName
//         }));

//         // Filter buses by matching the date
//         const filteredBuses = buses.filter((bus) => {
//           const backendDate = dayjs(bus.date, "DD/MM/YYYY");
//           const selectedDateFormatted =
//             dayjs(selectedDate).format("DD/MM/YYYY");
//           console.log("Backend Date:", backendDate.format("DD/MM/YYYY")); // Debugging
//           console.log("Selected Date:", selectedDateFormatted); // Debugging
//           return backendDate.isSame(selectedDateFormatted, "day");
//         });

//         console.log("Filtered Buses:", filteredBuses); // Debugging
//         setDataInp(filteredBuses);

//         if (filteredBuses.length === 0) {
//           setError("No buses found for the selected route and date.");
//         }
//       } else {
//         setError("No buses found for the selected route.");
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err.message);
//       setError("Failed to fetch bus routes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderBusList = () => {
//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (dataInp.length > 0) {
//       return <BusList buses={dataInp} />;
//     }
//     return <p>No results to display. Select a route and click "Get Routes".</p>;
//   };

//   return (
//     <div className="p-5 bg-blue-300 border border-blue-500 rounded-md">
//       <div className="max-w-md mx-auto">
//         <form
//           className="flex flex-col items-center space-y-4"
//           onSubmit={getRoutes}
//         >
//           <select
//             onChange={(e) => setStartCity(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">FROM</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>

//           <select
//             onChange={(e) => setDestination(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">TO</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//           </select>

//           <input
//             type="date"
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             Get Routes
//           </button>
//         </form>

//         <div className="mt-4">{renderBusList()}</div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";
// import BusList from "../BusList/BusList";

// export default function RouteSelector() {
//   const [dataInp, setDataInp] = useState([]);
//   const [startCity, setStartCity] = useState("");
//   const [destination, setDestination] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const getRoutes = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!startCity || !destination) {
//       setError("Both 'From' and 'To' cities must be selected.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/booking/`,
//         { startCity, destination },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.data && response.data.buses) {
//         setDataInp(response.data.buses);
//       } else {
//         setError("No buses found for the selected route.");
//       }
//     } catch (err) {
//       console.error("Error fetching routes:", err.message);
//       setError("Failed to fetch bus routes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderBusList = () => {
//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (dataInp.length > 0) {
//       return <BusList buses={dataInp} />;
//     }
//     return <p>No results to display. Select a route and click "Get Routes".</p>;
//   };

//   return (
//     <div className="p-5 bg-blue-300 border border-blue-500 rounded-md">
//       <div className="max-w-md mx-auto">
//         <form
//           className="flex flex-col items-center space-y-4"
//           onSubmit={getRoutes}
//         >
//           <select
//             onChange={(e) => setStartCity(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">FROM</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>

//           <select
//             onChange={(e) => setDestination(e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">TO</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             Get Routes
//           </button>
//         </form>

//         <div className="mt-4">{renderBusList()}</div>
//       </div>
//     </div>
//   );
// }

//
