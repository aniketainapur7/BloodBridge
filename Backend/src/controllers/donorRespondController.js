const BloodRequest = require("../models/blood-request.model");
const User = require("../models/user.model"); 

const donorRespondController = async (req, res) => {
  try {
    const { donorId, requestId, status } = req.body;

    if (!donorId || !requestId || !["accepted", "declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Fetch the request
    const request = await BloodRequest.findById(requestId).populate("requestedBy");

    if (!request) {
      return res.status(404).json({ error: "Blood request not found" });
    }

    if (status === "accepted") {
      request.status = "matched";
      request.acceptedBy = donorId;
      await request.save();

      return res.status(200).json({ updatedRequest: request });
    }
    return res.status(200).json({ message: "Donor declined the request" });
  } catch (error) {
    console.error("Error in donorRespondController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = donorRespondController;
