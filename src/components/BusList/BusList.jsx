import React, { useState, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

export default function BusList({ buses }) {
  console.log("Received buses:", buses);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (!buses || buses.length === 0) {
      setSelectedBusId(null);
      setShowReset(false);
    }
  }, [buses]);

  const handleBookNow = (busId) => {
    localStorage.setItem("selectedBusId", busId);
    setSelectedBusId(busId);
    setShowReset(true);
  };

  const handleReset = () => {
    localStorage.removeItem("selectedBusId");
    setSelectedBusId(null);
    setShowReset(false);
  };

  const renderBuses = () => {
    if (!buses || buses.length === 0) {
      return (
        <p className="text-center text-gray-500">
          No buses available. Please try another route.
        </p>
      );
    }

    return buses.map((bus) => (
      <div
        key={bus._id}
        className="bg-blue-50 rounded-lg shadow-lg p-4 my-5 transition-transform transform hover:scale-105"
      >
        <div className="flex flex-wrap items-center mb-4">
          <div className="w-1/4 font-semibold">Brand</div>
          <div className="w-1/4 font-semibold">From</div>
          <div className="w-1/4 font-semibold">To</div>
          <div className="w-1/4 font-semibold">Date</div>
          <div className="w-1/4 font-semibold">Price</div>
        </div>

        <div className="flex flex-wrap items-center">
          <div className="w-1/4 mb-2">{bus.companyName}</div>
          <div className="w-1/4 mb-2">{bus.startCity}</div>
          <div className="w-1/4 mb-2">{bus.destination}</div>
          <div className="w-1/4 mb-2">{bus.date}</div>
          <div className="w-1/4 mb-2">₹{bus.pricePerSeat}</div>

          <div className="w-full sm:w-1/2 mb-2">
            <button
              className={`px-4 py-2 text-white rounded ${
                selectedBusId === bus._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => handleBookNow(bus._id)}
              disabled={selectedBusId === bus._id}
            >
              {selectedBusId === bus._id ? "Selected" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="mt-4">
      {renderBuses()}

      {showReset && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleReset}
          >
            Reset Selection
          </button>
        </div>
      )}

      {selectedBusId && (
        <div className="flex justify-center mt-4 text-green-700 animate-bounce">
          <FaAngleDoubleDown size={24} />
        </div>
      )}
    </div>
  );
}
