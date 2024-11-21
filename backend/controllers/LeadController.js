
const Lead = require('../modal/Lead'); 

exports.getLeads = async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'leadName', sortOrder = 'asc', ...filters } = req.query;
      const skip = (page - 1) * limit;
      const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      // Applying filters dynamically
      const filterConditions = {};
      if (filters.status) filterConditions.status = filters.status;
      if (filters.assignedTo) filterConditions.assignedTo = filters.assignedTo;
      if (filters.leadSource) filterConditions.leadSource = filters.leadSource; 
  
      const leads = await Lead.find(filterConditions)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));
  
      const totalLeads = await Lead.countDocuments(filterConditions);
      const totalPages = Math.ceil(totalLeads / limit);
  
      res.status(200).json({ leads, totalPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getLeads = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = 5; 
      const skip = (page - 1) * limit;
  
      const leads = await Lead.find().skip(skip).limit(limit);
      const totalLeads = await Lead.countDocuments();
      const totalPages = Math.ceil(totalLeads / limit);
  
      res.status(200).json({ leads, totalPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({sucess:false, message: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createLead = async (req, res) => {

  try {
    console.log("hello")
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
