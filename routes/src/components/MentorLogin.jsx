import React, { useState, useEffect } from "react";

// ✅ Define backend URL dynamically (use Vercel URL in production)
const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://counselling-website-backend.vercel.app"; // default fallback

const ADMIN_ID = "mentor123";
const ADMIN_PASS = "admin@123";

export default function MentorLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          // ✅ ensure array type to avoid `.map` crash
          if (Array.isArray(data)) setStudents(data);
          else {
            console.error("Invalid student data:", data);
            setStudents([]);
          }
        })
        .catch((err) => console.error("Error fetching students:", err));
    }
  }, [isLoggedIn]);

  // 🧠 Add new student
  const handleAddStudent = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!res.ok) throw new Error("Failed to add student");

      const data = await res.json();
      alert("✅ Student added successfully!");
      setStudents((prev) => [...prev, data]);
      setNewStudent({ name: "", mobile: "", counselingType: "" });
    } catch (err) {
      console.error("Error adding student:", err);
      alert("❌ Failed to add student. Please check the console/logs.");
    }
  };

  // 💻 Mentor login
  const handleLogin = (id, pass) => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials ❌");
    }
  };

  // 💻 If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="bg-neutral-800 p-10 rounded-2xl shadow-xl">
          <h2 className="text-white text-3xl mb-6 font-semibold">
            Mentor Login
          </h2>
          <input
            type="text"
            placeholder="Mentor ID"
            className="block w-full p-3 mb-4 rounded bg-gray-700 text-white"
            onChange={(e) => (window.mentorId = e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-3 mb-4 rounded bg-gray-700 text-white"
            onChange={(e) => (window.mentorPass = e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded w-full"
            onClick={() => handleLogin(window.mentorId, window.mentorPass)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🧭 Mentor Dashboard
  return (
    <div className="p-8 space-y-10 bg-neutral-900 min-h-screen text-white">
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* 🧠 Manage Students */}
      <section className="bg-neutral-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Manage Students
        </h3>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="p-2 m-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={newStudent.mobile}
            onChange={(e) =>
              setNewStudent({ ...newStudent, mobile: e.target.value })
            }
            className="p-2 m-2 rounded bg-gray-700"
          />
          <input
            type="text"
            placeholder="Counseling Type"
            value={newStudent.counselingType}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                counselingType: e.target.value,
              })
            }
            className="p-2 m-2 rounded bg-gray-700"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-600 p-2 rounded"
          >
            Add Student
          </button>
        </div>

        {/* Students list */}
        {students.length === 0 ? (
          <p className="text-gray-400">No students found.</p>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-gray-700 p-3 rounded flex justify-between items-center"
              >
                <span>
                  <strong>{student.name}</strong> — {student.counselingType}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
