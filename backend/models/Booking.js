const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    destination: {
      type: String,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    specialRequests: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    pickupLocation: { type: String },
    totalPrice: { type: Number }, // can be calculated later
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;