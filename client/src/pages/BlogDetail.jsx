import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { SERVER_URL } from "@/main";

const BlogDetail = () => {
  const { id } = useParams();

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [showComment, setShowComment] = useState([]);
  const { userdata } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/api/blogs/single/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log("BLOG RESPONSE:", res.data);

        setBlog(res.data.blog);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // add comments
  const addComments = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/comments/add/${id}`,
        { text },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Comment added successful...");
      setText("");
      getComments();
    } catch (error) {
      console.log(error);
      toast.error("Comment posting failed...");
    }
  };

  //get comments
  const getComments = async () => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/comments/get/${id}`
      );
      setShowComment(result.data.comments);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //like blog
  const likeHandler = async () => {
    try {
      const result = await axios.put(
        `${SERVER_URL}/api/blogs/like/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Blog liked / unliked successfully");
      setBlog(result.data.blog);
    } catch (error) {
      console.log(error);
      toast.error("Failed to like blog");
    }
  };

  //Comment like
  const commentLikeHandler = async (commentId) => {
    try {
      const result = await axios.put(
        `${SERVER_URL}/api/comments/toggle-like/${commentId}`,
        {},
        { withCredentials: true }
      );

      const updatedComment = result.data.comment;

      setShowComment((prev) =>
        prev.map((comment) =>
          comment._id === updatedComment._id
            ? { ...comment, likes: updatedComment.likes }
            : comment
        )
      );

      console.log(result.data);
      toast.success("Comment liked / unliked successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to like comment");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <button
          onClick={() => navigate("/blog")}
          className="text-blue-600 mt-4"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-6"
        >
          ← Back
        </Button>

        <img
          src={blog.image}
          alt="blog"
          className="w-full h-[420px] object-cover rounded-xl"
        />

        <h1 className="text-4xl font-bold mt-8">{blog.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={"/author.avif"}
            alt="author"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-gray-600">
            {blog.author?.firstName} {blog.author?.lastName}
          </p>
        </div>

        <div
          className="mt-6 prose prose-lg dark:prose-invert max-w-none w-full break-words"
          dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content) }}
        />

        <div className="mt-5">
          <Button
            onClick={likeHandler}
            variant="outline"
            className="flex items-center gap-2"
          >
            {blog.likes.includes(userdata?._id) ? (
              <AiFillLike className="text-xl text-blue-600" />
            ) : (
              <AiOutlineLike className="text-xl" />
            )}
            <span>{blog.likes.length} Likes</span>
          </Button>
        </div>

        <div className="flex mt-5 gap-3 items-center">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            className="border px-2 py-1.5 border-gray-300 rounded-lg w-full"
            placeholder="Drop comments"
          />
          <Button onClick={addComments} className="cursor-pointer">
            Comment
          </Button>
        </div>

        <div className="mt-5">
          <Button onClick={getComments} className="cursor-pointer">
            Show comments
          </Button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Comments
          </h2>

          {Array.isArray(showComment) && showComment.length > 0 ? (
            showComment.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-4 py-4 border-b 
                   border-gray-200 dark:border-neutral-700"
              >
                {/* Avatar */}
                <img
                  src={comment?.user?.photoUrl || "/author.avif"}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Comment Content */}
                <div className="flex-1">
                  {/* Name */}
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {comment?.user?.firstName} {comment?.user?.lastName}
                  </p>

                  {/* Comment Text */}
                  <p
                    className="mt-1 text-sm leading-relaxed
                        text-gray-700 dark:text-gray-300"
                  >
                    {comment.text}
                  </p>

                  {/* Actions */}
                  <div
                    className="mt-2 flex items-center gap-4
                          text-sm text-gray-500 dark:text-gray-400"
                  >
                    <button
                      className="flex items-center gap-1 
                         hover:text-blue-600 dark:hover:text-blue-400 
                         transition"
                    >
                      {comment.likes.includes(userdata?._id) ? (
                        <AiFillLike
                          onClick={() => commentLikeHandler(comment._id)}
                          className="text-xl text-blue-600"
                        />
                      ) : (
                        <AiOutlineLike
                          onClick={() => commentLikeHandler(comment._id)}
                          className="text-xl"
                        />
                      )}
                      <span>{comment.likes.length} Likes</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
