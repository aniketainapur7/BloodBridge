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

const getIncomingRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("requestedBy", "fullName");
   
      // const user = await findBy(req.user._id)

    const response = requests.map((req) => ({
      id: req._id,
      name: req.user?.fullName || "Unknown",
      bloodType: req.bloodType,
      urgency: req.urgency,
      hospitalLocation: req.hospitalLocation,
      createdAt: req.createdAt,
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching blood requests:", err);
    res.status(500).json({ message: "Server error while fetching requests" });
  }
};





module.exports = {
  BloodRequestSubmission,getIncomingRequests
};


