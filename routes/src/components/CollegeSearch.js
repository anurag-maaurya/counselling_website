import React, { useState } from 'react';
import axios from 'axios';

function CollegeSearch() {
  const [collegeName, setCollegeName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/gemini/college-details', { collegeName });
      setDetails(response.data.details);
    } catch (error) {
      alert("Failed to fetch details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>College Admission Helper</h1>
      <input
        type="text"
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        placeholder="Enter college name"
      />
      <button onClick={fetchDetails} disabled={loading}>
        {loading ? 'Loading...' : 'Get Details'}
      </button>
      <div>
        <h2>Details:</h2>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default CollegeSearch;
