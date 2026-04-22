const express = require('express');
const { getVehicles } = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getVehicles);

module.exports = router;
