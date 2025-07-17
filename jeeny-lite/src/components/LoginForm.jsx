// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUser, setCurrentUser } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("passenger");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setCurrentUser(existingUser);
      redirectToDashboard(existingUser.userType);
    } else {
      const newUser = {
        id: uuidv4(),
        name,
        email,
        userType,
        isAvailable: userType === "driver" ? true : undefined,
      };
      saveUser(newUser);
      setCurrentUser(newUser);
      redirectToDashboard(userType);
    }
  };

  const redirectToDashboard = (type) => {
    if (type === "passenger") navigate("/passenger");
    else if (type === "driver") navigate("/driver");
  };

  return (
    <div className="w-full max-w-md bg-green-700 p-8 rounded-lg shadow-xl text-white text-center">
      <h1 className="text-4xl font-bold mb-2 tracking-wide">EcoLift</h1>
      <p className="italic text-lg mb-6">Travel cheaper! Travel clean!</p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 text-sm text-white">Name</label>
          <input
            className="w-full px-4 py-2 rounded bg-white text-black"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-white">Email</label>
          <input
            className="w-full px-4 py-2 rounded bg-white text-black"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-white">Account Type</label>
          <select
            className="w-full px-4 py-2 rounded bg-white text-black"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-green-700 font-semibold py-2 rounded hover:bg-green-100 transition duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
