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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 py-8">
      <div className="w-full max-w-3xl text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          College Review AI{" "}
          <span className="text-orange-500">Powered by Gemini</span>
        </h1>
        <p className="text-gray-400">
          Get instant, factual reviews on any Indian engineering college's
          ranking, placements, and top branches.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center gap-3 mt-6"
        >
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Enter college name (e.g., IET Lucknow)"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <div className="mt-8 p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg text-left">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {review}
            </p>
          </div>
        )}
      </div>

      {/* Gradient Glow for Eye-catching Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/10 via-black to-black blur-3xl"></div>
    </div>
  );
};

export default CollegeReviewAI;
