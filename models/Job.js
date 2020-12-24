const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: false,
    },
    position: {
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required: true,  
        unique: false,
    },
})

module.exports = mongoose.model('Job', JobSchema);