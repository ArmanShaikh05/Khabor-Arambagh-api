import mongoose from "mongoose";

const newspaperSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    newspaper: {
        url:{
            type:String,
        },
        public_id:{
            type:String,
        }
    },
},{
    timestamps:true
});

export const newspaper = new mongoose.model("newsPaper", newspaperSchema);
