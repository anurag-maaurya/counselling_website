import React, { useState } from "react";
import { useRequests } from "../context/RequestContext"; 

export default function Login() {
  const VALID_ID = "SAMEER";
  const VALID_PASSWORD = "aa";
  const { addRequest } = useRequests(); 

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState("query");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (id === VALID_ID && password === VALID_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid ID or Password");
    }
  };

  const handleSubmit = () => {
    if (!message.trim()) return alert("Please enter a message!");
    addRequest(type, id, message);
    setMessage("");
    alert("Request submitted successfully!");
  };

  // --- Login Form View ---
  if (!loggedIn) {
    return (
      // Card uses bg-neutral-800, border-gray-700, and a softer shadow
      <div className="max-w-md mx-auto bg-neutral-800 shadow-xl shadow-black/40 p-10 mt-20 mb-20 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">Student Login</h2>
        
        <input
          type="text"
          placeholder="Enter Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          // Input uses bg-neutral-900 for a slight contrast with the card
          className="bg-neutral-900 border border-gray-700 text-gray-200 w-full mb-4 p-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // Input uses bg-neutral-900 for a slight contrast with the card
          className="bg-neutral-900 border border-gray-700 text-gray-200 w-full mb-4 p-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
        />
        
        {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
        
        <button
          onClick={handleLogin}
          className="bg-orange-600 text-white font-semibold tracking-wider px-4 py-3 rounded-lg hover:bg-orange-700 w-full shadow-lg transition duration-300 transform hover:scale-[1.01]"
        >
          LOGIN
        </button>
        
        <p className="mt-6 text-center text-gray-500 text-sm">
         <a href="#" className="text-white hover:text-white"> Demo id=SAMEER password=aa</a>
        </p>
      </div>
    );
  }

  // --- Request Submission View ---
  return (
    // Card uses bg-neutral-800, border-gray-700, and a softer shadow
    <div className="max-w-lg mx-auto bg-neutral-800 shadow-xl shadow-black/40 p-10 rounded-xl mt-20 mb-20 border border-gray-700">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        Welcome, {id.toUpperCase()}!
      </h2>
      <p className="text-gray-400 text-center mb-6">Submit your request directly to your dedicated mentor.</p>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Request Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          // Select uses bg-neutral-900 for better contrast
          className="bg-neutral-900 border border-gray-700 text-gray-200 rounded-lg w-full p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
        >
          <option value="query">General Query</option>
          <option value="call">Mentor Call Request</option>
          <option value="choice">Choice Filling Assistance</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Your Message:</label>
        <textarea
          placeholder="Briefly describe your request (e.g., 'Need help verifying my JOSAA document upload,' or 'Available for call at 5 PM today')"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // Textarea uses bg-neutral-900 for better contrast
          className="bg-neutral-900 border border-gray-700 text-gray-200 w-full p-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
          rows="5"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-orange-600 text-white font-semibold tracking-wider px-4 py-3 rounded-lg hover:bg-orange-700 w-full shadow-lg transition duration-300 transform hover:scale-[1.01]"
      >
        Submit Request
      </button>
    </div>
  );
}