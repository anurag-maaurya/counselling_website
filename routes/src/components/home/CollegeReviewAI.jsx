import React, { useState } from "react";

export default function CollegeReview({ collegeName }) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetReview = async () => {
    setLoading(true);
    setReview("");

    try {
      // ✅ Now using relative API URL (works automatically on same domain)
      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Give a detailed, student-friendly review for the college named ${collegeName}. Include academics, placements, campus life, and faculty.`,
        }),
      });

      const data = await res.json();
      setReview(data.review || "No review available right now.");
    } catch (err) {
      console.error(err);
      setReview("Error fetching AI review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">AI College Review</h3>

      <button
        onClick={handleGetReview}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Get AI Review"}
      </button>

      {review && (
        <p className="mt-4 whitespace-pre-line text-gray-800">{review}</p>
      )}
    </div>
  );
}
