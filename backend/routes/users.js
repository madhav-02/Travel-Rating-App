const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register New User

router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser._id);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});


// Login User

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).json("Wrong username or password");
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            res.status(400).json("Wrong username or password");
            return;
        }
        res.status(200).json({_id:user._id, username:user.username});
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;