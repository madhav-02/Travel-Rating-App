const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true,
        minLength : 5
    },
    desc : {
        type: String,
        required: true,
        minLength : 5
    },
    rating : {
        type : Number,
        required : true,
        min: 0,
        max: 5
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    }
    
},{timestamps: true});


module.exports = mongoose.model("Pin",PinSchema);