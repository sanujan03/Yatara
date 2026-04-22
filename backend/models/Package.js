const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    destination: { type: String },
    duration: { type: Number }, // days
    price: { type: Number, required: true },
    maxPeople: { type: Number },
  },
  { timestamps: true }
);

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;