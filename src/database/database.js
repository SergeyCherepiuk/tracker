const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Tracker")
    .then(() => console.log("Successfully connected!"))
    .catch(() => console.log("Connection failed!"))