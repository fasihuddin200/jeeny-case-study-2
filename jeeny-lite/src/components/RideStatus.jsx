import { getUserRides } from "../utils/rideStorage";
import { getCurrentUser } from "../utils/storage";

export default function RideStatus() {
  const user = getCurrentUser();
  const activeRide = getUserRides(user.id).find(
    (ride) => ride.status !== "Completed"
  );

  if (!activeRide)
    return (
      <p className="text-gray-600 text-center">No active ride at the moment.</p>
    );

  return (
    <div className="space-y-2 text-center text-gray-800">
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
