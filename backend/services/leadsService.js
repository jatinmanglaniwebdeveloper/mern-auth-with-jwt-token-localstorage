
const Lead = require('../models/Lead');

exports.getLeads = async ({ page, sortBy, sortOrder }) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const leads = await Lead.find()
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const totalLeads = await Lead.countDocuments();
  const totalPages = Math.ceil(totalLeads / limit);

  return { leads, totalPages };
};

