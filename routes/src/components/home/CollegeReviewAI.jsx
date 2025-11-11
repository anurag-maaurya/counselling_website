import React, { useState, useCallback } from 'react';
// This component correctly uses fetch to communicate with your backend API,
// avoiding direct import of server-only modules like 'express' or 'mongoose'.

const CollegeReviewAI = () => {
  const [collegeName, setCollegeName] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to call the Express backend API
  const getReview = useCallback(async () => {
    if (!collegeName) {
      setError("Please enter a college name.");
      return;
    }

    setLoading(true);
    setReview('');
    setError('');

    try {
      // 💡 Hitting the Express server API endpoint
      // Ensure this URL is correct for your deployed backend
      const response = await fetch('https://stbg1.vercel.app/api/gemini-college-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: collegeName }), // Sending the prompt to the backend
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server-side errors (from your Express route)
        throw new Error(data.message || 'Failed to fetch review from the server.');
      }

      setReview(data.text);

    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      // Display a user-friendly error message
      setError(err.message || "Could not connect to the review service.");
    } finally {
      setLoading(false);
    }
  }, [collegeName]);


  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">College Review AI</h2>
      
      <input
        type="text"
        placeholder="Enter College Name (e.g., IIT Delhi)"
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      />

      <button
        onClick={getReview}
        disabled={loading || !collegeName}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-150 ease-in-out shadow-md"
      >
        {loading ? 'Fetching Review...' : 'Get AI Review'}
      </button>

      {error && (
        <p className="mt-4 text-red-600 p-3 bg-red-50 border border-red-200 rounded-lg">{error}</p>
      )}

      {review && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Review Result:</h3>
          {/* Since your backend returns Markdown, you might want to use a Markdown renderer library 
              (like 'react-markdown') for proper formatting instead of a basic <pre> tag. */}
          <pre className="text-sm font-mono overflow-x-auto p-2 bg-white rounded">{review}</pre>
        </div>
      )}
    </div>
  );
};

export default CollegeReviewAI;
