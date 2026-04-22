const Vehicle = require('../models/Vehicle');

// @desc    Get all available vehicles
// @route   GET /api/vehicles
// @access  Private
const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({ isAvailable: true }).sort({ createdAt: -1 });
  res.json(vehicles);
};

module.exports = { getVehicles };
