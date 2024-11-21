import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditLead() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [leadData, setLeadData] = useState({
    leadName: '',
    contactNumber: '',
    email: '',
    leadSource: '',
    status: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLead();
  }, []);

 
  const fetchLead = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/lead/${id}`);
      setLeadData(response.data);
    } catch (error) {
      setError('Error fetching lead details');
    }
  };

  
  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/lead/${id}`, leadData);
      navigate('/view'); 
    } catch (error) {
      setError('Error updating lead details');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Edit Lead</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Lead Name:</label>
          <input
            type="text"
            name="leadName"
            value={leadData.leadName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={leadData.contactNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={leadData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Lead Source:</label>
          <select
            name="leadSource"
            value={leadData.leadSource}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Source</option>
            <option value="web">Web</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Status:</label>
          <select
            name="status"
            value={leadData.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="new">New</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditLead;
