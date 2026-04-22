const Booking = require('../models/Booking');

const normalizeToDateOnly = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const validateBookingDates = (bookingDate, endDate) => {
  if (!bookingDate) {
    return 'Booking start date is required';
  }

  const start = normalizeToDateOnly(bookingDate);
  const today = normalizeToDateOnly(new Date());

  if (Number.isNaN(start.getTime())) {
    return 'Invalid booking start date';
  }

  if (start < today) {
    return 'Booking start date cannot be in the past';
  }

  if (endDate !== undefined && endDate !== null && endDate !== '') {
    const end = normalizeToDateOnly(endDate);

    if (Number.isNaN(end.getTime())) {
      return 'Invalid booking end date';
    }

    if (end < start) {
      return 'End date cannot be earlier than start date';
    }
  }

  return null;
};

// @desc    Create a new booking (customer only)
// @route   POST /api/bookings
// @access  Private (customer, staff, admin)
const createBooking = async (req, res) => {
  const {
    package,
    vehicle,
    bookingDate,
    endDate,
    destination,
    numberOfPeople,
    specialRequests,
    pickupLocation,
    totalPrice,
  } = req.body;

  const dateValidationError = validateBookingDates(bookingDate, endDate);
  if (dateValidationError) {
    return res.status(400).json({ message: dateValidationError });
  }

  const booking = await Booking.create({
    user: req.user._id,
    package,
    vehicle,
    bookingDate,
    endDate,
    destination,
    numberOfPeople,
    specialRequests,
    pickupLocation,
    totalPrice,
    status: 'pending', // always start as pending
  });

  if (booking) {
    res.status(201).json(booking);
  } else {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

// @desc    Get all bookings (admin only) OR staff can see all? We'll restrict to admin.
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('package', 'name price')
    .populate('vehicle', 'model registrationNumber');
  res.json(bookings);
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('package', 'name price')
    .populate('vehicle', 'model');
  res.json(bookings);
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private (owner or admin)
const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('package')
    .populate('vehicle');

  if (booking) {
    // Allow if user is owner or admin/staff
    if (
      booking.user._id.toString() === req.user._id.toString() ||
      req.user.role === 'admin' ||
      req.user.role === 'staff'
    ) {
      res.json(booking);
    } else {
      res.status(403).json({ message: 'Not authorized to view this booking' });
    }
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

// @desc    Update booking (admin/staff only)
// @route   PUT /api/bookings/:id
// @access  Private/Admin/Staff
const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const isPrivileged = req.user.role === 'admin' || req.user.role === 'staff';
  const isOwner = booking.user.toString() === req.user._id.toString();

  if (!isPrivileged && !isOwner) {
    return res.status(403).json({ message: 'Not authorized to update this booking' });
  }

  // Admin/staff can update any allowed field.
  if (isPrivileged) {
    const isDateFieldProvided = req.body.bookingDate !== undefined || req.body.endDate !== undefined;
    if (isDateFieldProvided) {
      const nextBookingDate = req.body.bookingDate !== undefined ? req.body.bookingDate : booking.bookingDate;
      const nextEndDate = req.body.endDate !== undefined ? req.body.endDate : booking.endDate;
      const dateValidationError = validateBookingDates(nextBookingDate, nextEndDate);

      if (dateValidationError) {
        return res.status(400).json({ message: dateValidationError });
      }
    }

    if (req.body.status !== undefined) booking.status = req.body.status;
    if (req.body.package !== undefined) booking.package = req.body.package;
    if (req.body.vehicle !== undefined) booking.vehicle = req.body.vehicle;
    if (req.body.bookingDate !== undefined) booking.bookingDate = req.body.bookingDate;
    if (req.body.endDate !== undefined) booking.endDate = req.body.endDate;
    if (req.body.destination !== undefined) booking.destination = req.body.destination;
    if (req.body.numberOfPeople !== undefined) booking.numberOfPeople = req.body.numberOfPeople;
    if (req.body.specialRequests !== undefined) booking.specialRequests = req.body.specialRequests;
    if (req.body.pickupLocation !== undefined) booking.pickupLocation = req.body.pickupLocation;
    if (req.body.totalPrice !== undefined) booking.totalPrice = req.body.totalPrice;

    const updatedBooking = await booking.save();
    return res.json(updatedBooking);
  }

  // Customer rules for self-service edits/cancel.
  if (booking.status === 'cancelled' || booking.status === 'completed') {
    return res.status(400).json({ message: 'This booking can no longer be modified' });
  }

  const bookingTime = new Date(booking.bookingDate).getTime();
  const nowTime = Date.now();
  const moreThan12Hours = bookingTime - nowTime > 12 * 60 * 60 * 1000;

  // Customer can always cancel pending/confirmed bookings.
  if (req.body.status === 'cancelled') {
    booking.status = 'cancelled';
    const cancelledBooking = await booking.save();
    return res.json(cancelledBooking);
  }

  // Confirmed bookings only allow cancel, not edit.
  if (booking.status === 'confirmed') {
    return res.status(400).json({ message: 'Confirmed bookings can only be cancelled' });
  }

  // Pending bookings can be edited only if more than 12 hours remain.
  if (!moreThan12Hours) {
    return res.status(400).json({ message: 'Booking can be edited only more than 12 hours before start time' });
  }

  const isDateFieldProvided = req.body.bookingDate !== undefined || req.body.endDate !== undefined;
  if (isDateFieldProvided) {
    const nextBookingDate = req.body.bookingDate !== undefined ? req.body.bookingDate : booking.bookingDate;
    const nextEndDate = req.body.endDate !== undefined ? req.body.endDate : booking.endDate;
    const dateValidationError = validateBookingDates(nextBookingDate, nextEndDate);

    if (dateValidationError) {
      return res.status(400).json({ message: dateValidationError });
    }
  }

  const allowedEditFields = [
    'package',
    'vehicle',
    'bookingDate',
    'endDate',
    'destination',
    'numberOfPeople',
    'specialRequests',
    'pickupLocation',
    'totalPrice',
  ];
  allowedEditFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      booking[field] = req.body[field];
    }
  });

  const updatedBooking = await booking.save();
  return res.json(updatedBooking);
};

// @desc    Delete booking (soft delete - set status to cancelled)
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};