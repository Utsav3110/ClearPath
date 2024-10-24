import mongoose from "mongoose";



 const connectDB = async () =>{
    try {
        
    const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
    
    console.log("connection success")


    } catch (error) {
        console.log("DB connection falied ", error);
        process.exit(1)
    }
}



export default connectDB;