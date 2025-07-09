const express = require('express');
const donorRespondController = require("../controllers/donorRespondController.js")
const verifyjwt = require("../middlewares/auth.middlewares.js");


const router = express.Router();
router.post("/request/respond",verifyjwt,donorRespondController);


module.exports = router;