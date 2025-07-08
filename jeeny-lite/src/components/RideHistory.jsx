import { getUserRides } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";

export default function RideHistory() {
  const user = getCurrentUser();
  const completedRides = getUserRides(user.id).filter(
    (ride) => ride.status === "Completed"
  );

  if (completedRides.length === 0) {
    return <p className="text-gray-600 text-center">No rides completed yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {completedRides.map((ride) => (
        <li key={ride.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
          <p>
            <strong>From:</strong> {ride.pickupLocation} → <strong>To:</strong>{" "}
            {ride.dropLocation}
          </p>
          <p>
            <strong>Type:</strong> {ride.rideType}
          </p>
        </li>
      ))}
    </ul>
  );
}
