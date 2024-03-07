import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        // type: String,
        url:{
            type: String,
        },
        public_id:{
            type: String,
        }
    },
    category: {
        type: Array,
    },
    section : {
        type: String,
    },
},{
    timestamps:true
});

export const news = new mongoose.model("news", newsSchema);
