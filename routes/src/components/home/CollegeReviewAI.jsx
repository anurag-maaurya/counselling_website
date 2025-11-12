import React, { useState } from "react";

const CollegeReviewAI = () => {
  const [college, setCollege] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!college) return alert("Enter a college name");

    setLoading(true);
    setReview("");

    try {
      const response = await fetch("https://counselling-website-backend.vercel.app/api/college-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: college }),
      });

      const data = await response.json();
      setReview(data.review || "Sorry, no details found.");
    } catch (err) {
      console.error("AI fetch error:", err);
      setReview("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">AI College Review</h1>
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg w-96">
        <input
          type="text"
          placeholder="Enter college name..."
          className="w-full p-3 rounded-lg bg-black text-white border border-orange-500 focus:outline-none"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-orange-500 text-black font-semibold py-2 rounded-lg hover:bg-orange-600"
        >
          {loading ? "Loading..." : "Get Review"}
        </button>
        {review && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p>{review}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeReviewAI;
