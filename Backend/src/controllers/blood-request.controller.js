const BloodRequest = require("../models/blood-request.model");

const BloodRequestSubmission = async (req, res) => {
  try {
    const requestedBy = req.user._id;
    const { bloodType, urgency, hospitalLocation } = req.body;

    if (!hospitalLocation || !hospitalLocation.lat || !hospitalLocation.lng) {
      return res.status(400).json({ error: "Invalid hospitalLocation" });
    }

    const geoLocation = {
      type: "Point",
      coordinates: [hospitalLocation.lng, hospitalLocation.lat], // GeoJSON requires [lng, lat]
    };

    const newRequest = await BloodRequest.create({
      bloodType,
      urgency,
      hospitalLocation: geoLocation,
      requestedBy,
      status: "pending",
    });

    res.status(200).json({ requestId: newRequest._id });
  } catch (error) {
    console.log("error in BloodRequestSubmission in blood-request controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = BloodRequestSubmission;
