import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import singleUpload from "../middleware/multer.js";
import {
  create,
  deleteBlog,
  getAll,
  getSingle,
  toggleLike,
  updateBlog,
} from "../controllers/blogController.js";

const blogRoute = express.Router();

blogRoute.post("/create", isAuth, isAdmin, singleUpload, create);
blogRoute.get("/all", isAuth, getAll);
blogRoute.get("/single/:id", isAuth, getSingle);
blogRoute.put("/update/:id", isAuth, isAdmin, singleUpload, updateBlog);
blogRoute.delete("/delete/:id", isAuth, isAdmin, deleteBlog);
blogRoute.put("/like/:blogId", isAuth, toggleLike);

export default blogRoute;
