import { useState } from "react";
import { RIDE_TYPES, RIDE_STATUSES } from "../utils/constants";
import { saveRide } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export default function RideRequestForm({ onRideRequested }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rideType, setRideType] = useState(RIDE_TYPES[0]);

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
      status: RIDE_STATUSES.REQUESTED,
      timestamp: Date.now(),
    };
    saveRide(newRide);
    onRideRequested(); // Tell parent to re-fetch ride status
    setPickup("");
    setDrop("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold">Request a Ride</h3>
      <input
        placeholder="Pickup Location"
        className="w-full border px-3 py-2 rounded"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        required
      />
      <input
        placeholder="Drop Location"
        className="w-full border px-3 py-2 rounded"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
        required
      />
      <select
        className="w-full border px-3 py-2 rounded"
        value={rideType}
        onChange={(e) => setRideType(e.target.value)}
      >
        {RIDE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Request Ride
      </button>
    </form>
  );
}
