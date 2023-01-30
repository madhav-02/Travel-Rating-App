const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
dotenv.config();

const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology:true})
.then( () =>{
    console.log("MONGODB Connected");
})
.catch( (error)=>{
    console.log("Error while connecting to MONGO DB ",error);
})

app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);

app.listen(8000, ()=>{
    console.log("App is listening");
})