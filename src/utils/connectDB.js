const mongoose=require("mongoose");

const MONGO_URI=process.env.MONGO_URI

const connectDB= async()=>{
    await mongoose.connect(MONGO_URI).then(()=>{
        console.log("Databse is connected")
    }).catch((err) => console.log('error mongodb' , err));
};

module.exports= connectDB;