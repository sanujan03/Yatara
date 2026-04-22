const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Private
const getPackages = async (req, res) => {
  const packages = await Package.find({}).sort({ createdAt: -1 });
  res.json(packages);
};

module.exports = { getPackages };
