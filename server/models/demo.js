const mongoose = require("mongoose")

const demoSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
})

const demoModel = mongoose.model("users", demoSchema)
module.exports =  demoModel