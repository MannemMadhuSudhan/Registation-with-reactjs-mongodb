//    path: server/models/registration.js

const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
name: String,
email: String,
password: String

})

const registrationModel = mongoose.model("register" , registrationSchema)
module.exports = registrationModel