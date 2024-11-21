import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', leadSource: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(2);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lead');
      console.log('API response:', response.data);
      if (response.data && Array.isArray(response.data.leads)) {
        setLeads(response.data.leads);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
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

  const filteredLeads = leads.filter((lead) => {
    return (
      (filters.status === '' || lead.status === filters.status) &&
      (filters.leadSource === '' || lead.leadSource === filters.leadSource)
    );
  });

  const sortedLeads = filteredLeads.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.leadName.localeCompare(b.leadName);
    } else {
      return b.leadName.localeCompare(a.leadName);
    }
  });


  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = sortedLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const nextPage = () => {
    if (currentPage < Math.ceil(sortedLeads.length / leadsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
          {currentLeads.length > 0 ? (
            currentLeads.map((lead) => (
              <tr key={lead._id} className="text-center">
                <td className="p-2 border-b">{lead.leadName}</td>
                <td className="p-2 border-b">{lead.contactNumber}</td>
                <td className="p-2 border-b">{lead.email}</td>
                <td className="p-2 border-b">{lead.leadSource}</td>
                <td className="p-2 border-b">{lead.status}</td>
                <td className="p-2 border-b space-x-4">
                  <Link
                    to={`/leads/${lead._id}`}
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
            ))
          ) : (
            <tr>
              <td className="p-2 border-b" colSpan="6">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(sortedLeads.length / leadsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`p-2 ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(sortedLeads.length / leadsPerPage)}
          className="p-2 bg-gray-200 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LeadsList;
