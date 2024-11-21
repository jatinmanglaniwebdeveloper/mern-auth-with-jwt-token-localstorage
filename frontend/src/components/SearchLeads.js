// SearchLeads.js
import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

function SearchLeads() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchLeads = debounce(async (searchQuery) => {
    try {
      const response = await axios.get('/api/leads/search', { params: { query: searchQuery } });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching leads:', error);
    }
  }, 500); // Debounce API calls by 500ms

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    fetchLeads(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, email, or contact number"
        value={query}
        onChange={handleSearchChange}
      />
      <ul>
        {results.map((lead) => (
          <li key={lead.id}>{lead.leadName}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchLeads;
