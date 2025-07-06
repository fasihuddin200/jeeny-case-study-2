import { getUserRides } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";

export default function RideStatus() {
  const user = getCurrentUser();
  const activeRide = getUserRides(user.id).find(
    (ride) => ride.status !== "Completed"
  );

  if (!activeRide) return null;

  return (
    <div className="bg-blue-50 p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Current Ride Status</h3>
      <p>
        <strong>From:</strong> {activeRide.pickupLocation}
      </p>
      <p>
        <strong>To:</strong> {activeRide.dropLocation}
      </p>
      <p>
        <strong>Type:</strong> {activeRide.rideType}
      </p>
      <p>
        <strong>Status:</strong> {activeRide.status}
      </p>
    </div>
  );
}
