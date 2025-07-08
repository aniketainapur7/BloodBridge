const express = require("express");
const app = express();
app.use(express.json());
const authroute = require("./routes/auth.route.js");
app.use("/api/auth",authroute);

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})