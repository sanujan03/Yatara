const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema(
  {
    model: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    capacity: { type: Number }, // number of seats
    driverName: { type: String },
    driverPhone: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;