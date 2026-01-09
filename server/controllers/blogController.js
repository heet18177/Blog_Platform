import cloudinary from "../configs/cloudinary.js";
import { Blog } from "../models/Blog.js";
import fs from 'fs';

// create a blog
export const create = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "Title, content and author are required",
        success: false,
      });
    }

    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        message: "Image file is required",
        success: false,
      });
    }

    const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
      folder: "blog_images",
    });

    fs.unlinkSync(imageFile.path)

    const newBlog = await Blog.create({
      title,
      content,
      author: req.user._id,
      image: uploadImage.secure_url,
      likes: [],
      commentsCount: 0,
      isPublished: isPublished
    });
    return res.status(201).json({
      success: true,
      blog: newBlog,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// get all blogs
export const getAll = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "firstName lastName photoUrl")
      .sort({ createdAt: -1 });

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}


// get a single blog
export const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate(
      "author",
      "firstName lastName photoUrl"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublished } = req.body;

    // 🔍 find blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 🔒 authorization (owner OR admin)
    if (
      blog.author.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this blog",
      });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    if (typeof isPublished === "boolean") {
      blog.isPublished = isPublished;
    }

    const imageFile = req.file
    if (imageFile) {
      const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: "blog_images",
      });
      fs.unlinkSync(imageFile.path)
      blog.image = uploadImage.secure_url;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (
      blog.author.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    }
    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// toggle like for a blog
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const user = req.user._id;
    const index = blog.likes.indexOf(user);
    if (index === -1) {
      blog.likes.push(user);
    } else {
      blog.likes.splice(index, 1);
    }
    await blog.save();
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
