import { useState } from "react";
import { RIDE_TYPES, RIDE_STATUSES } from "../utils/constants";
import { saveRide } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export default function RideRequestForm({ onRideRequested }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rideType, setRideType] = useState(RIDE_TYPES[0]);
  const [carpoolAllowed, setCarpoolAllowed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const newRide = {
      id: uuidv4(),
      passengerId: user.id,
      driverId: null,
      pickupLocation: pickup,
      dropLocation: drop,
      rideType,
      carpoolAllowed,
      carpoolGroup: [user.id], // Start with the primary user
      status: RIDE_STATUSES.REQUESTED,
      timestamp: Date.now(),
    };
    saveRide(newRide);
    onRideRequested();
    setPickup("");
    setDrop("");
    setCarpoolAllowed(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Request a Ride
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-5"
      >
        <input
          className="w-full max-w-md px-5 py-3 text-lg border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          className="w-full max-w-md px-5 py-3 text-lg border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          required
        />
        <select
          className="w-full max-w-md px-5 py-3 text-lg border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          value={rideType}
          onChange={(e) => setRideType(e.target.value)}
        >
          {RIDE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2 text-gray-700 text-base">
          <input
            type="checkbox"
            checked={carpoolAllowed}
            onChange={(e) => setCarpoolAllowed(e.target.checked)}
            className="accent-green-600 w-5 h-5"
          />
          <span>Allow other passengers to carpool with me</span>
        </label>

        <button
          type="submit"
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition"
        >
          Request Ride
        </button>
      </form>
    </div>
  );
}
