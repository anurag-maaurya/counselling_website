import React, { useState, useEffect } from "react";
import { useRequests } from "../context/RequestContext";

// ✅ Auto-detect backend URL
const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://counselling-website-backend.vercel.app";

export default function MentorLogin() {
  const { requests, resolveRequest } = useRequests();

  // 🧠 Login state
  const [mentorId, setMentorId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 Default credentials
  const ADMIN_ID = "mentor123";
  const ADMIN_PASS = "admin@123";

  // 🧠 Student state
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    mobile: "",
    counselingType: "",
  });

  // 🧠 Fetch students (only when logged in)
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${backendUrl}/api/students`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch students");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) setStudents(data);
          else setStudents([]);
        })
        .catch((err) => console.error("Error fetching students:", err));
    }
  }, [isLoggedIn]);

  // 🔐 Handle login
  const handleLogin = () => {
    if (mentorId === ADMIN_ID && password === ADMIN_PASS) {
      alert("✅ Login successful!");
      setIsLoggedIn(true);
    } else {
      alert("❌ Invalid Mentor ID or Password");
    }
  };

  // ➕ Add new student
  const handleAddStudent = async () => {
    const { name, mobile, counselingType } = newStudent;
    if (!name.trim() || !mobile.trim() || !counselingType.trim()) {
      return alert("Please fill in Name, Mobile, and Counseling Type");
    }

    try {
      const res = await fetch(`${backendUrl}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, counselingType }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Student added successfully!");
        setStudents((prev) => [data, ...prev]);
        setNewStudent({ name: "", mobile: "", counselingType: "" });
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Error adding student:", err);
      alert("❌ Failed to connect to backend");
    }
  };

  // 🧹 Resolve student request
  const handleResolve = (id) => {
    resolveRequest(id);
  };

  // 💻 Login page
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="bg-neutral-800 p-10 rounded-xl shadow-2xl shadow-black/50 w-96 border border-gray-700">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            🔐 Mentor Login
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Mentor ID"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              className="bg-neutral-900 border border-gray-700 text-gray-200 p-3 rounded-lg w-full focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-900 border border-gray-700 text-gray-200 p-3 rounded-lg w-full focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
            />

            <button
              onClick={handleLogin}
              className="bg-orange-600 text-white w-full py-3 rounded-lg hover:bg-orange-700 transition-all font-semibold shadow-lg mt-2"
            >
              LOGIN
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Default ID: <b className="text-gray-300">mentor123</b> | Password:{" "}
            <b className="text-gray-300">admin@123</b>
          </p>
        </div>
      </div>
    );
  }

  // 🧭 Mentor dashboard
  return (
    <div className="p-8 space-y-10 bg-neutral-900 min-h-screen">
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-3xl font-bold text-orange-500">
          🎓 Mentor Dashboard
        </h2>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md"
        >
          Logout
        </button>
      </div>

      {/* 🧠 Manage Students */}
      <section className="bg-neutral-800 p-6 rounded-xl shadow-2xl shadow-black/40 border border-gray-700">
        <h3 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
          Manage Students
        </h3>

        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter student name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="bg-neutral-900 border border-gray-700 text-gray-300 p-3 rounded-lg w-64 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter mobile number"
            value={newStudent.mobile}
            onChange={(e) =>
              setNewStudent({ ...newStudent, mobile: e.target.value })
            }
            className="bg-neutral-900 border border-gray-700 text-gray-300 p-3 rounded-lg w-64 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter counseling type"
            value={newStudent.counselingType}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                counselingType: e.target.value,
              })
            }
            className="bg-neutral-900 border border-gray-700 text-gray-300 p-3 rounded-lg w-64 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <button
            onClick={handleAddStudent}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold shadow-md"
          >
            ➕ Add Student
          </button>
        </div>

        <div className="overflow-auto max-h-96 border border-gray-700 rounded-lg">
          <table className="w-full border-collapse text-sm text-gray-300">
            <thead>
              <tr className="bg-neutral-900 sticky top-0 shadow-md">
                <th className="border-b border-gray-700 p-3 text-left text-orange-400">
                  Name
                </th>
                <th className="border-b border-gray-700 p-3 text-left text-orange-400">
                  Mobile
                </th>
                <th className="border-b border-gray-700 p-3 text-left text-orange-400">
                  Counseling Type
                </th>
                <th className="border-b border-gray-700 p-3 text-left text-orange-400">
                  Added On
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 text-gray-500 bg-neutral-800"
                  >
                    No students added yet
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s._id}
                    className="even:bg-neutral-900 hover:bg-neutral-700 transition duration-150"
                  >
                    <td className="border-r border-gray-800 p-3 text-white">
                      {s.name}
                    </td>
                    <td className="border-r border-gray-800 p-3">
                      {s.mobile}
                    </td>
                    <td className="border-r border-gray-800 p-3 text-orange-400">
                      {s.counselingType}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 📞 Student Requests */}
      <section className="bg-neutral-800 p-6 rounded-xl shadow-2xl shadow-black/40 border border-gray-700">
        <h3 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
          Pending Student Requests
        </h3>

        {requests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-neutral-900 border border-gray-700 rounded-lg p-4 shadow-lg flex justify-between items-center hover:bg-neutral-700 transition duration-200"
              >
                <div>
                  <p className="font-medium text-white mb-1">
                    {req.name}{" "}
                    <span className="text-orange-500 text-xs ml-2 uppercase">
                      ({req.type})
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 italic">{req.message}</p>
                </div>
                <button
                  onClick={() => handleResolve(req.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold transition-all"
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
