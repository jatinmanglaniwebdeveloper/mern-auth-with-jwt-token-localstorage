import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', leadSource: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [filters, sortOrder]);


  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lead', {
        params: { 
          status: filters.status,
          leadSource: filters.leadSource,
          sortOrder 
        }
      });
      setLeads(response.data);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching leads.');
    }
  };


  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

 
  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/lead/${id}`);
      setLeads(leads.filter((lead) => lead._id !== id)); 
    } catch (error) {
      setError('Failed to delete the lead.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="converted">Converted</option>
          </select>

          <select
            name="leadSource"
            value={filters.leadSource}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Sources</option>
            <option value="web">Web</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        <button
          onClick={handleSortChange}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Sort by Name ({sortOrder})
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">Lead Name</th>
            <th className="p-2 border-b">Contact Number</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Lead Source</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="p-2 border-b">{lead.leadName}</td>
              <td className="p-2 border-b">{lead.contactNumber}</td>
              <td className="p-2 border-b">{lead.email}</td>
              <td className="p-2 border-b">{lead.leadSource}</td>
              <td className="p-2 border-b">{lead.status}</td>
              <td className="p-2 border-b space-x-4">
                <Link
                  to={`/edit-lead/${lead._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(lead._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && <p>No leads found.</p>}
    </div>
  );
}

export default LeadsList;
