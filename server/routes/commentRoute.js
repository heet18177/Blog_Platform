import express from "express";
import { addComment, getComments, toggleLike, deleteComment } from "../controllers/commentController.js";
import { isAuth, isAdmin } from "../middleware/isAuth.js";

const commentRoute = express.Router();

commentRoute.post('/add/:blogId' , isAuth , addComment);
commentRoute.get('/get/:blogId' , getComments);
commentRoute.put('/toggle-like/:commentId' , isAuth , toggleLike);
commentRoute.delete('/delete/:commentId' , isAuth , isAdmin , deleteComment); 

export default commentRoute;