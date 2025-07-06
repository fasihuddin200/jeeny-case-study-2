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
      // Login flow
      setCurrentUser(existingUser);
      redirectToDashboard(existingUser.userType);
    } else {
      // Register flow
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Login or Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
