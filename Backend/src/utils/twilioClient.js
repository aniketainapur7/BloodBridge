
const twilio = require("twilio");

const accountSid = "US23bf1e3140c92388ba9a1346b42f5a9d"; // your Twilio SID
const authToken = "75b6f16a8db155407d01c6c9e5ccc881";    // your Twilio Auth Token
const client = twilio(accountSid, authToken);

module.exports = client;
