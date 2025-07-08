const express = require('express');
const verifyjwt = require("../middlewares/auth.middlewares.js");
const donorMatchController = require("../controllers/blooddonor.controller.js");

const router = express.Router();

router.get("/donors/match", verifyjwt, donorMatchController);


module.exports = router;