const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique: true,
        minLength : 3,
        maxLength : 20
    },
    email : {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    password : {
        type: String,
        required: true,
        minLength: 5

    }
},{timestamps: true});


module.exports = mongoose.model("User",UserSchema);