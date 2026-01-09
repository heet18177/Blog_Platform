import { Blog } from "../models/Blog.js";
import { Comment } from "../models/Comment.js";

export const addComment = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const {text} = req.body;

        if(!text){
            return res.status(400).json({
                success: false,
                message: "Comment text is required",
            });

        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        const comment = await Comment.create({
            blog: blogId,
            user: req.user._id,
            text,
        });

        blog.commentsCount++;
        await blog.save();

        res.status(201).json({
            success: true,
            comment,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getComments = async(req,res)=>{
    try {
        const {blogId} = req.params;
        
        const comments = await Comment.find({blog: blogId}).populate("user", "firstName lastName photoUrl").sort({createdAt: -1});
        res.status(200).json({
            success: true,
            comments,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const toggleLike = async(req,res)=>{
    try {
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }
        const user = req.user._id;
        const index = comment.likes.indexOf(user);
        if(index === -1){
            comment.likes.push(user);
        }else{
            comment.likes.splice(index, 1);
        }
        await comment.save();
        res.status(200).json({
            success: true,
            comment,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const deleteComment = async(req,res)=>{
    try {
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }
        if(comment.user.toString() !== req.user._id && req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this comment",
            });
        }
        await comment.deleteOne();
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


