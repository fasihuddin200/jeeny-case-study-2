import { useEffect, useState } from "react";
import {
  getAvailableRides,
  assignRideToDriver,
  getRides,
  updateDriverRideStatus,
  addPassengerToCarpoolRide,
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

  const handleSimulateCarpool = (rideId) => {
    const fakePassengerId = `carpool-passenger-${Math.floor(
      Math.random() * 10000
    )}`;
    addPassengerToCarpoolRide(rideId, fakePassengerId);
    setRefresh(!refresh);
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
        <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-center">
            Your Current Ride
          </h3>
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
          {currentRide.carpoolGroup && currentRide.carpoolGroup.length > 1 && (
            <p>
              <strong>Passengers:</strong> {currentRide.carpoolGroup.length}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center space-y-3">
            {currentRide.carpoolAllowed &&
              currentRide.status !== "Completed" && (
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                  onClick={() => handleSimulateCarpool(currentRide.id)}
                >
                  + Add Carpool Passenger
                </button>
              )}
            {currentRide.status === "Accepted" && (
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={() => updateStatus("In Progress")}
              >
                Start Ride
              </button>
            )}
            {currentRide.status === "In Progress" && (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => updateStatus("Completed")}
              >
                Complete Ride
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-center">
            Available Ride Requests
          </h3>
          {availableRides.length === 0 ? (
            <p className="text-gray-600 text-center">No rides available.</p>
          ) : (
            availableRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white p-4 rounded shadow space-y-2"
              >
                <p>
                  <strong>From:</strong> {ride.pickupLocation}
                </p>
                <p>
                  <strong>To:</strong> {ride.dropLocation}
                </p>
                <p>
                  <strong>Type:</strong> {ride.rideType}
                </p>
                {ride.carpoolAllowed && (
                  <p className="text-green-700 text-sm">
                    Carpooling allowed ✅
                  </p>
                )}
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(ride.id)}
                >
                  Accept Ride
                </button>
                {ride.carpoolAllowed && (
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                    onClick={() => handleSimulateCarpool(ride.id)}
                  >
                    + Add Carpool Passenger
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
