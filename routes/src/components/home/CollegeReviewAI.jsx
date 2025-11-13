import React, { useState } from "react";

const CollegeReviewAI = () => {
  const [college, setCollege] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!college.trim()) return;

    setLoading(true);
    setReview("");

    try {
      const res = await fetch("https://your-backend-url.onrender.com/api/gemini-college-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ college }),
      });

      const data = await res.json();
      setReview(data.review || "No review found. Try again with full college name.");
    } catch (error) {
      setReview("⚠️ Sorry, something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
        College Review AI <span className="text-orange-500">Powered by Gemini</span>
      </h1>
      <p className="text-gray-400 mb-6 text-center max-w-2xl">
        Get instant, factual reviews on any Indian engineering college’s ranking, placements, and top branches.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 justify-center items-center mb-8"
      >
        <input
          type="text"
          placeholder="Enter college name (e.g., IET Lucknow)"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="px-4 py-3 w-72 sm:w-96 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-md font-semibold transition"
        >
          {loading ? "Fetching..." : "Get Review"}
        </button>
      </form>

      {review && (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg max-w-3xl text-gray-200 shadow-md">
          <p className="whitespace-pre-line leading-relaxed">{review}</p>
        </div>
      )}
    </div>
  );
};

export default CollegeReviewAI;
