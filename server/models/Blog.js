import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    commentsCount: {
        type: Number,
        default: 0,
    },

    isPublished: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);