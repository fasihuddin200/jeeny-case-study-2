import { useState } from "react";
import RideRequestForm from "../components/RideRequestForm";
import RideStatus from "../components/RideStatus";
import RideHistory from "../components/RideHistory";
import { getCurrentUser, logoutUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function PassengerDashboard() {
  const [refresh, setRefresh] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-6">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-green-800">
          Welcome, {user.name}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section 1: Request a Ride */}
        <RideRequestForm onRideRequested={() => setRefresh(!refresh)} />

        {/* Section 2: Ride Status */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Current Ride Status
          </h3>
          <RideStatus key={refresh} />
        </div>

        {/* Section 3: Ride History */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Ride History
          </h3>
          <RideHistory />
        </div>
      </div>
    </div>
  );
}
