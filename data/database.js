import mongoose  from "mongoose";

const connectDb = () =>{
    mongoose.connect(process.env.DATABASE_URI,{dbName:"KhoborArambagh"}).then(()=>{
        console.log("Database Connected")
    }).catch((e)=>{
        console.log(e)
    })
}

export default connectDb