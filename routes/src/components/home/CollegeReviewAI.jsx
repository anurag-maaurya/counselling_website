import React, { useState } from 'react';

// Tailwind CSS classes for the old UI: Dark card, orange button, and powered by text
const primaryColor = 'text-orange-500';
const buttonBg = 'bg-orange-600 hover:bg-orange-700';
const cardBg = 'bg-gray-800';
const inputStyle = 'bg-gray-700 text-white placeholder-gray-400 border-gray-600';
const resultBg = 'bg-gray-900 border border-gray-700';

const CollegeReviewAI = () => {
  const [prompt, setPrompt] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReview = async () => {
    if (!prompt.trim()) {
      setError('Please enter a college name.');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    // --- Core API Logic (Calls the Express Backend) ---
    try {
      // NOTE: This URL should point to your Vercel-deployed server's API endpoint
      const response = await fetch('/api/gemini-college-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.text) {
          // Use 'text' from the response as the review content
          setReview(data.text); 
      } else {
          // Handle cases where the response is missing the 'text' property
          setReview("Sorry, I couldn't fetch the review right now. The response was empty.");
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Sorry, I couldn\'t fetch the review right now. Please check your network or server logs.');
      setReview('Sorry, I couldn\'t fetch the review right now. Please try again later or refine your college name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Card Container - Dark Background */}
      <div className={`${cardBg} shadow-2xl rounded-xl p-8 w-full max-w-2xl text-white`}>
        <h1 className="text-3xl font-bold text-center mb-1">
          College Review AI
        </h1>
        <p className={`text-center mb-6 text-sm font-semibold ${primaryColor}`}>
          Powered by Gemini
        </p>
        <p className="text-gray-400 text-center mb-6">
          Get instant, factual reviews on any Indian engineering college's ranking, placements, and top branches.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <input
            type="text"
            className={`flex-grow p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${inputStyle}`}
            placeholder="Enter full college name (e.g., IIT Bombay)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                fetchReview();
              }
            }}
            disabled={loading}
          />
          <button
            className={`p-3 rounded-lg font-semibold transition duration-200 shadow-md ${buttonBg} text-white`}
            onClick={fetchReview}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get Review'}
          </button>
        </div>

        {/* Result Area */}
        <div className={`p-4 rounded-lg min-h-32 mt-4 ${resultBg}`}>
          {error && <p className="text-red-400 font-medium">{error}</p>}
          {loading && (
            <div className="flex items-center space-x-2 text-orange-400">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Fetching college data from Gemini...</span>
            </div>
          )}
          {review && !loading && (
            <div 
                className="text-gray-300 review-output" 
                // WARNING: dangerouslySetInnerHTML is used here to render Markdown content from the API.
                // In a real application, ensure the API output is sanitized.
                dangerouslySetInnerHTML={{ __html: review.replace(/\n/g, '<br>') }} 
            />
          )}
          {!review && !loading && !error && (
            <p className="text-gray-500">
                The college review will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeReviewAI;
