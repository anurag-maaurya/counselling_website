// NOTE: This is a conceptual implementation. 
// You must set up a secure backend endpoint to proxy requests to the Google Gemini API.
import React, { useState } from 'react';
// Import or define your spinner/loading icon
// import { Spinner } from './Spinner'; 

const CollegeReviewAI = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const predefinedQueryPrefix = 
        "Act as a college counselor specializing in Indian engineering admissions. Based only on established public knowledge, provide a concise review of the following institution focusing on NIRF ranking, top branches, placement statistics (average CTC), and location advantage. If a college name is ambiguous or invalid, politely guide the user. The college name is: ";
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setResponse('');
        setError(null);
        
        // --- 1. Construct the prompt for the Gemini Model ---
        const fullPrompt = predefinedQueryPrefix + searchTerm;

        try {
            // --- 2. Call your secure backend API endpoint ---
            // REPLACE THIS URL with your actual backend URL that handles the Gemini API call
            const apiResponse = await fetch('http://localhost:5001/api/gemini-college-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: fullPrompt }),
            });

            if (!apiResponse.ok) {
                throw new Error(`API returned status ${apiResponse.status}`);
            }

            const data = await apiResponse.json();
            
            // --- 3. Display the AI's response ---
            setResponse(data.text); // Assuming your backend returns { text: "AI generated review..." }

        } catch (err) {
            console.error("Gemini API Error:", err);
            setError("Sorry, I couldn't fetch the review right now. Please try again later or refine your college name.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-800 border-t border-gray-700">
            <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl font-extrabold text-white mb-2">
                    College Review AI <span className="text-orange-500">Powered by Gemini</span>
                </h3>
                <p className="text-gray-400 mb-8">
                    Get instant, factual reviews on any Indian engineering college's ranking, placements, and top branches.
                </p>

                {/* Search Input Form */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="e.g., IIT Bombay, HBTU Kanpur, AKTU Lucknow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow bg-neutral-900 border border-gray-700 text-white p-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300 disabled:bg-gray-600 shadow-lg"
                    >
                        {isLoading ? 'Searching...' : 'Get Review'}
                    </button>
                </form>

                {/* AI Response Area */}
                <div className="mt-8 p-6 bg-neutral-900 rounded-xl border border-gray-700 text-left min-h-[150px] flex items-center justify-center">
                    {isLoading && (
                        <p className="text-orange-500 font-medium animate-pulse">
                            Processing request...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-400 font-medium">
                            {error}
                        </p>
                    )}
                    {response && (
                        // Use dangerouslySetInnerHTML if you expect rich text (Markdown formatting) from the AI
                        <div className="text-gray-300 leading-relaxed space-y-3" 
                             dangerouslySetInnerHTML={{ __html: response }} 
                        />
                    )}
                    {!isLoading && !error && !response && (
                        <p className="text-gray-500">
                            Search for a college to see the AI review here.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollegeReviewAI;