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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <RideRequestForm onRideRequested={() => setRefresh(!refresh)} />
      <div className="mt-6">
        <RideStatus key={refresh} />
      </div>
      <RideHistory />
    </div>
  );
}
