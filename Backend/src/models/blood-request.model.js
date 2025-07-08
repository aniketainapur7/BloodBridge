const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  hospitalLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "matched", "fulfilled", "cancelled"],
    default: "pending",
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, {
  timestamps: true,
});

bloodRequestSchema.index({ hospitalLocation: "2dsphere" });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
