const express = require('express');
const verifyjwt = require("../middlewares/auth.middlewares.js");
const BloodRequestSubmission = require("../controllers/blood-request.controller.js");

const router = express.Router();

router.post("/blood-request", verifyjwt, BloodRequestSubmission)

module.exports = router;