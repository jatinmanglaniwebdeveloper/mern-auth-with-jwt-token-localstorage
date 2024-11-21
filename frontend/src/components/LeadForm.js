import React, { useState } from 'react';

function LeadForm({ lead, onSubmit }) {
  const [formData, setFormData] = useState({
    leadName: lead?.leadName || '',
    contactNumber: lead?.contactNumber || '',
    email: lead?.email || '',
    leadSource: lead?.leadSource || '',
    nextFollowUpDate: lead?.nextFollowUpDate || '', // Make sure to initialize with a valid date
    nextFollowUpTime: lead?.nextFollowUpTime || '', // Make sure to initialize with a valid time
    status: lead?.status || '',
    purchaseHistory: lead?.purchaseHistory || [], // If it's an array, initialize as an empty array
    medicalNeeds: lead?.medicalNeeds || '',
    assignedTo: lead?.assignedTo || '', // Ensure this is required
    address: lead?.address || '' // Ensure this is required
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!formData.leadName || !formData.contactNumber || !formData.nextFollowUpDate || !formData.nextFollowUpTime || !formData.assignedTo || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Lead created successfully!');
        onSubmit(data.lead); // Optionally, update parent component or clear form
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
    //   alert('An error occurred while creating the lead');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Lead</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="leadName">Lead Name</label>
        <input
          name="leadName"
          type="text"
          value={formData.leadName}
          onChange={handleChange}
          required
          placeholder="Lead Name"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="contactNumber">Contact Number</label>
        <input
          name="contactNumber"
          type="text"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          placeholder="Contact Number"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="leadSource">Lead Source</label>
        <select
          name="leadSource"
          type="text"
          value={formData.leadSource}
          onChange={handleChange}
          placeholder="Lead Source"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
        <option value="">Web</option>
        <option value="new">Referral</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="nextFollowUpDate">Follow-Up Date</label>
        <input
          name="nextFollowUpDate"
          type="date"
          value={formData.nextFollowUpDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="nextFollowUpTime">Follow-Up Time</label>
        <input
          name="nextFollowUpTime"
          type="time"
          value={formData.nextFollowUpTime}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="status">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="assignedTo">Assigned To</label>
        <input
          name="assignedTo"
          type="text"
          value={formData.assignedTo}
          onChange={handleChange}
          required
          placeholder="Assigned To"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700" htmlFor="address">Address</label>
        <input
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
      >
        Save Lead
      </button>
    </form>
  );
}

export default LeadForm;
