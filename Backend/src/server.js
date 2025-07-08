require("dotenv").config();
const cookie = require("cookie-parser");
const express = require("express");
const app = express();
app.use(express.json());

const dbconnect  = require("./DB/db.js");
dbconnect();
app.use(cookie());
const authroute = require("./routes/auth.route.js");
app.use("/api/auth",authroute);

const bloodrequest = require("./routes/blood-request.route.js");
app.use("/api/blood" ,bloodrequest);
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})