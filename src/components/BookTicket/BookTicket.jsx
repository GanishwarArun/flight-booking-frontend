import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookTicket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bus = state?.bus || null;

  if (!bus) {
    return (
      <div className="text-center text-red-500 mt-5">
        <h1>Bus Details Not Found</h1>
        <p>Please go back and select a bus to proceed.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    busId: bus._id,
    seatsToBook: "",
    arrivalTime: "",
    departureTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/book-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.status) {
        alert(data.message);
        console.log("Bus Details:", data.bus);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book the ticket.");
    }
  };

  return (
    <div className="p-5 bg-gray-100 border border-gray-300 rounded-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Book Your Ticket</h1>
      <div className="mb-6">
        <p className="font-medium">Bus Company: {bus.companyName}</p>
        <p>From: {bus.startCity}</p>
        <p>To: {bus.destination}</p>
        <p>Price Per Seat: ₹{bus.pricePerSeat}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Bus ID:</label>
          <input
            type="text"
            name="busId"
            value={formData.busId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Seats to Book:</label>
          <input
            type="number"
            name="seatsToBook"
            value={formData.seatsToBook}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Arrival Time:</label>
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Departure Time:</label>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
};

export default BookTicket;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const BookTicket = () => {
//   const { state } = useLocation();
//   const { bus } = state || {}; // Access the bus details passed via navigate
//   const [formData, setFormData] = useState({
//     busId: bus ? bus._id : "", // Pre-fill the busId if available
//     seatsToBook: "",
//     arrivalTime: "",
//     departureTime: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/booking/book-ticket`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();
//       if (data.status) {
//         alert(data.message); // Show a success message
//         console.log("Bus Details:", data.bus); // Log bus details for debugging
//       } else {
//         alert(data.message); // Show an error message
//       }
//     } catch (error) {
//       console.error("Error booking ticket:", error); // Log any errors
//       alert("Failed to book the ticket. Please try again later.");
//     }
//   };

//   return (
//     <div className="p-5 bg-gray-100 border border-gray-300 rounded-md max-w-md mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-4">Book Your Ticket</h1>
//       {bus ? (
//         <div className="mb-6">
//           <p className="font-medium">Bus Company: {bus.companyName}</p>
//           <p>From: {bus.startCity}</p>
//           <p>To: {bus.destination}</p>
//           <p>Price Per Seat: ₹{bus.pricePerSeat}</p>
//         </div>
//       ) : (
//         <p className="text-red-500 mb-4">
//           No bus information available. Please go back and select a bus.
//         </p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Bus ID:</label>
//           <input
//             type="text"
//             name="busId"
//             value={formData.busId}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Seats to Book:</label>
//           <input
//             type="number"
//             name="seatsToBook"
//             value={formData.seatsToBook}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Arrival Time:</label>
//           <input
//             type="time"
//             name="arrivalTime"
//             value={formData.arrivalTime}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Departure Time:</label>
//           <input
//             type="time"
//             name="departureTime"
//             value={formData.departureTime}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Book Ticket
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookTicket;

// import React, { useState } from "react";

// const BookTicket = () => {
//   const [formData, setFormData] = useState({
//     busId: "",
//     seatsToBook: "",
//     arrivalTime: "",
//     departureTime: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/booking/book-ticket",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();
//       if (data.status) {
//         alert(data.message);
//         console.log("Bus Details: ", data.bus);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error booking ticket:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Bus ID:</label>
//         <input
//           type="text"
//           name="busId"
//           value={formData.busId}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Seats to Book:</label>
//         <input
//           type="number"
//           name="seatsToBook"
//           value={formData.seatsToBook}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Arrival Time:</label>
//         <input
//           type="time"
//           name="arrivalTime"
//           value={formData.arrivalTime}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Departure Time:</label>
//         <input
//           type="time"
//           name="departureTime"
//           value={formData.departureTime}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Book Ticket</button>
//     </form>
//   );
// };

// export default BookTicket;
