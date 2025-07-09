require("dotenv").config();
const cookie = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const dbconnect  = require("./DB/db.js");
dbconnect();
app.use(cookie());
app.use(express.urlencoded({ extended: true }));

const authroute = require("./routes/auth.route.js");
app.use("/api/auth",authroute);

// this api endpoint made for blood request add in database 
const bloodrequest = require("./routes/blood-request.route.js");
app.use("/api" ,bloodrequest);

// this api endoint made for finding blood donars in database
const blooddonors = require("./routes/blooddonor.route.js");
app.use("/api/blood", blooddonors);

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

