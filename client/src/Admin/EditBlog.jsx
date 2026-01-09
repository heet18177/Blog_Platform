import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TiptapEditor from "@/components/TiptapEditor";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Fetch Blog Details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/blogs/single/${id}`,
          { withCredentials: true }
        );
        const { blog } = data;
        setTitle(blog.title);
        setContent(blog.content);
        setIsPublished(blog.isPublished);
        setImagePreview(blog.image); // Display existing image
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blog details");
        navigate("/blog");
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("isPublished", isPublished);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `http://localhost:5000/api/blogs/update/${id}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Post updated successfully!");
      navigate("/blog");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-black dark:text-white text-center">
            Edit Post
          </h1>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 md:p-8">
            <form onSubmit={updatePost} className="flex flex-col gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Blog Cover Image
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-4 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="edit-image-upload"
                  />
                  <label
                    htmlFor="edit-image-upload"
                    className="w-full flex flex-col items-center cursor-pointer"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 object-contain rounded-md"
                      />
                    ) : (
                      <div className="py-10 text-center">
                        Click to upload new image
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Publish Status */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Publish Status
                </label>
                <select
                  value={isPublished}
                  onChange={(e) => setIsPublished(e.target.value === "true")}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Content
                </label>
                {content && (
                  <TiptapEditor
                    content={content}
                    onChange={setContent}
                    className="mb-12 min-h-[300px]"
                  />
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold mt-2"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Post"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
