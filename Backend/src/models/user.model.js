const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  role: {
    type: String,
    enum: ["donor", "recipient"],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
