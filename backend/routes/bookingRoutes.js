const express = require('express');
const {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All booking routes are protected
router.use(protect);

// Customer routes
router.route('/')
  .post(createBooking);  // any authenticated user can create

router.get('/mybookings', getMyBookings);

// Admin/Staff only routes
router.route('/')
  .get(authorize('admin', 'staff'), getBookings); // admin/staff can see all

router.route('/:id')
  .get(getBookingById) // owner or admin/staff can view
  .put(updateBooking) // admin/staff full update, owner restricted self-service update
  .delete(authorize('admin'), deleteBooking); // admin only (soft delete)

module.exports = router;