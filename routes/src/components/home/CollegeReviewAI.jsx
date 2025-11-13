import React, { useState } from "react";

const CollegeReviewAI = () => {
  const [college, setCollege] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReview("");

    try {
      const response = await fetch("https:///api/gemini-college-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ college }),
      });
      const data = await response.json();
      setReview(data.review || "Sorry, no review found. Try again.");
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 bg-black rounded-2xl p-8 shadow-lg border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          College Review AI{" "}
          <span className="text-orange-500">Powered by Gemini</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Get instant factual reviews of any Indian engineering college.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-3 justify-center"
      >
        <input
          type="text"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="Enter college name (e.g. IET Lucknow)"
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-3 text-white w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          {loading ? "Loading..." : "Get Review"}
        </button>
      </form>

      {review && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 text-left whitespace-pre-line transition-all duration-300">
          {review}
        </div>
      )}
    </div>
  );
};

export default CollegeReviewAI;
