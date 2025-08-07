import mongoose from 'mongoose'


const connectDB=async()=>{
     await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB is connected")
     }).catch((err)=>{
        console.log("DB error :",err)
     })
}

export default connectDB;