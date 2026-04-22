const express = require('express');
const { getPackages } = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getPackages);

module.exports = router;
