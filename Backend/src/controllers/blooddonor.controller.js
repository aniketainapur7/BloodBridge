const User = require("../models/user.model");

const donorMatchController = async (req, res) => {
  try {
    
    const { bloodType, lat, lng } = req.query;
    console.log(bloodType);
    
    if (!bloodType || !lat || !lng) {
      return res.status(400).json({ error: "bloodType, lat and lng are required" });
    }
 
    const donors = await User.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      distanceField: "distance", 
      spherical: true,
      maxDistance: 10000,
      query: {
        role: "donor",
        bloodType: bloodType
      }
    }
  },
  {
    $project: {
      _id: 1,
      fullName: 1,
      email: 1,
      bloodType: 1,
      distance: {
        $round: [{ $divide: ["$distance", 1000] }, 2] // ✅ rounded km
      }
    }
  }
]);
    
    const result = donors.map(d => ({
      donorProfile: {
        _id: d._id,
        fullName: d.fullName,
        email: d.email,
        bloodType: d.bloodType
      },
      distance: d.distance
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in donorMatchController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = donorMatchController;
