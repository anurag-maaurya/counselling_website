import React, { useState } from "react";

// --- EXPANDED MOCK CUTOFF DATA (FOR DEMO ONLY) ---
const cutoffData = [
  // --- UPTU / AKTU Examples ---
  { college: "HBTU Kanpur", branch: "CSE", category: "General", closingRank: 30000, counseling: "UPTU" },
  { college: "HBTU Kanpur", branch: "Chemical", category: "OBC", closingRank: 45000, counseling: "UPTU" },
  { college: "HBTU Kanpur", branch: "IT", category: "EWS", closingRank: 35000, counseling: "UPTU" },
  { college: "IET Lucknow", branch: "CSE", category: "General", closingRank: 40000, counseling: "UPTU" },
  { college: "IET Lucknow", branch: "ECE", category: "OBC", closingRank: 55000, counseling: "UPTU" },
  { college: "MMMUT Gorakhpur", branch: "CSE", category: "General", closingRank: 45000, counseling: "UPTU" },
  { college: "KNIT Sultanpur", branch: "IT", category: "General", closingRank: 60000, counseling: "UPTU" },
  
  // --- JOSAA / NIT / IIIT Examples ---
  { college: "NIT Allahabad", branch: "CSE", category: "General", closingRank: 12000, counseling: "JOSAA" },
  { college: "NIT Jalandhar", branch: "ECE", category: "OBC", closingRank: 18000, counseling: "JOSAA" },
  { college: "NIT Bhopal", branch: "CSE", category: "EWS", closingRank: 15000, counseling: "JOSAA" },
  { college: "IIIT Lucknow", branch: "IT", category: "General", closingRank: 15000, counseling: "JOSAA" },
  { college: "IIIT Allahabad", branch: "ECE", category: "General", closingRank: 18000, counseling: "JOSAA" },
  
  // --- REAP (Rajasthan) Examples ---
  { college: "RTU Kota", branch: "CSE", category: "General", closingRank: 65000, counseling: "REAP" },
  { college: "SKIT Jaipur", branch: "CSE", category: "General", closingRank: 90000, counseling: "REAP" },
  { college: "Poornima Jaipur", branch: "ECE", category: "EWS", closingRank: 110000, counseling: "REAP" },
  
  // --- CSAB/Special Round Examples ---
  { college: "NIT Agartala", branch: "Civil", category: "General", closingRank: 75000, counseling: "CSAB" },
  { college: "NIT Srinagar", branch: "EE", category: "OBC", closingRank: 95000, counseling: "CSAB" },
];

const counselingOptions = ["UPTU", "JOSAA", "REAP", "CSAB"];
const categoryOptions = ["General", "OBC", "SC", "ST", "EWS"];
const branchOptions = ["CSE", "IT", "ECE", "Mechanical", "Chemical", "Civil", "Electrical", "EE"];


export default function RankPredictor() {
  const [selectedCounseling, setSelectedCounseling] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [marks, setMarks] = useState("");
  const [predictedRank, setPredictedRank] = useState(null);
  const [eligibleColleges, setEligibleColleges] = useState([]);
  const [error, setError] = useState("");

  // Helper function to simulate a realistic rank based on marks
  const getSimulatedRank = (marks) => {
    // Logic from previous iteration
    if (marks >= 250) return Math.floor(Math.random() * (15000 - 8000) + 8000); 
    if (marks >= 200) return Math.floor(Math.random() * (30000 - 15000) + 15000); 
    if (marks >= 150) return Math.floor(Math.random() * (60000 - 30000) + 30000);
    if (marks >= 100) return Math.floor(Math.random() * (120000 - 60000) + 60000);
    return Math.floor(Math.random() * (250000 - 120000) + 120000);
  };


  const handlePredict = (e) => {
    e.preventDefault();
    setError("");
    setPredictedRank(null);
    setEligibleColleges([]);

    if (!selectedCounseling || !category || !branch || !marks || isNaN(marks)) {
      setError("Please fill all required fields (Counseling, Marks, Category, Branch).");
      return;
    }

    const rank = getSimulatedRank(parseInt(marks));
    setPredictedRank(rank);

    // --- College Eligibility Filtering (Multi-Factor) ---
    const eligible = cutoffData.filter((c) => {
      const isCounselingMatch = c.counseling === selectedCounseling;
      const isCategoryMatch = c.category === category;
      const isBranchMatch = c.branch === branch;

      // Add a buffer for prediction leniency
      const buffer = Math.min(5000, rank * 0.1); 
      const isInRankRange = rank <= c.closingRank + buffer;

      return isCounselingMatch && isCategoryMatch && isBranchMatch && isInRankRange;
    });

    eligible.sort((a, b) => a.closingRank - b.closingRank);

    setEligibleColleges(eligible);
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-16 px-4 flex items-center justify-center">
      <div className="bg-neutral-800 shadow-2xl shadow-black/50 rounded-3xl p-8 lg:p-12 w-full max-w-5xl border border-gray-700">
        
        {/* --- STYLIZED HEADING --- */}
        <hgroup className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-2">
                <span className="text-orange-500">College</span> & Rank Predictor
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
                Discover your best admission possibilities across India based on your JEE Score.
            </p>
        </hgroup>

        <form onSubmit={handlePredict} className="space-y-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Input Fields */}
            {[
              { label: "Counseling Type *", state: selectedCounseling, setter: setSelectedCounseling, options: counselingOptions, placeholder: "-- Select Counseling --" },
              { label: "Category *", state: category, setter: setCategory, options: categoryOptions, placeholder: "-- Select Category --" },
              { label: "Branch Preference *", state: branch, setter: setBranch, options: branchOptions, placeholder: "-- Select Branch --" },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  {field.label}
                </label>
                <select
                  value={field.state}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full p-3 bg-neutral-900 border border-gray-700 text-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-md focus:shadow-orange-500/50 transition duration-200 custom-select-arrow"
                >
                  <option value="" disabled>{field.placeholder}</option>
                  {field.options.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            ))}

            {/* Marks Input (Separate for different style) */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Enter Marks (e.g., JEE Score) *
              </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full p-3 bg-neutral-900 border border-gray-700 text-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-md focus:shadow-orange-500/50 transition duration-200"
                placeholder="e.g., 220"
                min="0"
              />
            </div>
          </div>
          
          {error && <p className="text-red-400 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-4 rounded-xl transition tracking-widest shadow-xl shadow-orange-600/30 transform hover:scale-[1.01] uppercase"
          >
            GET MY COLLEGE PREDICTIONS
          </button>
        </form>

        {/* --- Prediction Results --- */}
        {predictedRank !== null && (
          <div className="mt-12 bg-neutral-900 p-8 rounded-2xl border border-orange-500/50 shadow-inner shadow-black/40">
            
            {/* RANK DISPLAY - MADE MORE VISIBLE */}
            <div className="text-center mb-6">
                <p className="text-xl font-semibold text-gray-300">Your Predicted Rank is:</p>
                <h2 className="text-6xl font-black text-white mt-1 mb-4">
                    <span className="text-orange-500 drop-shadow-lg">{predictedRank}</span>
                </h2>
            </div>


            {eligibleColleges.length > 0 ? (
              <div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-700 pb-3 text-center">
                  ✅ Top Colleges Eligible for You
                </h3>
                <ul className="space-y-4">
                  {eligibleColleges.map((college, index) => (
                    <li
                      key={index}
                      className="p-5 bg-neutral-800 border-l-4 border-orange-600 rounded-lg shadow-md text-gray-200 hover:bg-neutral-700 transition duration-200 transform hover:translate-x-1"
                    >
                      <strong className="text-xl text-white block">{college.college}</strong>
                      <span className="text-base text-orange-400 block mt-1">
                        Expected Admission Rank: {college.closingRank}
                      </span>
                      <span className="text-sm text-gray-500">
                        Branch: {college.branch} | Counseling: {college.counseling}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-orange-400 text-center font-medium text-sm">
                    *Disclaimer: This is a demo prediction based on fictional cutoff data. Actual admissions require expert guidance.
                </p>
              </div>
            ) : (
              <p className="text-gray-400 mt-3 text-center text-xl">
                ❌ Sorry, no exact matches found in our current data set. This indicates a high rank.
                <br/>
                **Book a Premium Session** for personalized strategic college filling!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}