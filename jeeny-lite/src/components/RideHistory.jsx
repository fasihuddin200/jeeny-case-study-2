import { getUserRides } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";

export default function RideHistory() {
  const user = getCurrentUser();
  const completedRides = getUserRides(user.id).filter(
    (ride) => ride.status === "Completed"
  );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Ride History</h3>
      {completedRides.length === 0 ? (
        <p className="text-gray-600">No rides completed yet.</p>
      ) : (
        <ul className="space-y-2">
          {completedRides.map((ride) => (
            <li key={ride.id} className="bg-white p-3 rounded shadow">
              <p>
                <strong>From:</strong> {ride.pickupLocation} →{" "}
                <strong>To:</strong> {ride.dropLocation}
              </p>
              <p>
                <strong>Type:</strong> {ride.rideType}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
