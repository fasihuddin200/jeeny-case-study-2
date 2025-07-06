import { useEffect, useState } from "react";
import {
  getAvailableRides,
  assignRideToDriver,
  getRides,
  updateDriverRideStatus,
} from "../utils/rideStorage";
import { getCurrentUser, logoutUser, getUsers } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [availableRides, setAvailableRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const user = getCurrentUser();

  useEffect(() => {
    const allRides = getRides();
    const myActiveRide = allRides.find(
      (r) => r.driverId === user.id && r.status !== "Completed"
    );
    setCurrentRide(myActiveRide);

    if (!myActiveRide) {
      setAvailableRides(getAvailableRides());
    } else {
      setAvailableRides([]);
    }
  }, [refresh, user.id]);

  const handleAccept = (rideId) => {
    assignRideToDriver(rideId, user.id);
    updateDriverAvailability(user.id, false);
    setRefresh(!refresh);
  };

  const updateStatus = (newStatus) => {
    updateDriverRideStatus(currentRide.id, newStatus);
    if (newStatus === "Completed") {
      updateDriverAvailability(user.id, true);
    }
    setRefresh(!refresh);
  };

  const updateDriverAvailability = (driverId, status) => {
    const users = getUsers().map((u) =>
      u.id === driverId ? { ...u, isAvailable: status } : u
    );
    localStorage.setItem("users", JSON.stringify(users));
    const current = getCurrentUser();
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...current, isAvailable: status })
    );
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user.name} (Driver)</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {currentRide ? (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h3 className="text-xl font-semibold">Your Current Ride</h3>
          <p>
            <strong>From:</strong> {currentRide.pickupLocation}
          </p>
          <p>
            <strong>To:</strong> {currentRide.dropLocation}
          </p>
          <p>
            <strong>Type:</strong> {currentRide.rideType}
          </p>
          <p>
            <strong>Status:</strong> {currentRide.status}
          </p>
          {currentRide.status === "Accepted" && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => updateStatus("In Progress")}
            >
              Start Ride
            </button>
          )}
          {currentRide.status === "In Progress" && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => updateStatus("Completed")}
            >
              Complete Ride
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Ride Requests</h3>
          {availableRides.length === 0 ? (
            <p className="text-gray-600">No rides available.</p>
          ) : (
            availableRides.map((ride) => (
              <div key={ride.id} className="bg-white p-4 rounded shadow">
                <p>
                  <strong>From:</strong> {ride.pickupLocation}
                </p>
                <p>
                  <strong>To:</strong> {ride.dropLocation}
                </p>
                <p>
                  <strong>Type:</strong> {ride.rideType}
                </p>
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(ride.id)}
                >
                  Accept Ride
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
