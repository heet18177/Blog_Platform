import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Trash2, SquarePen } from "lucide-react";
import { toast } from "sonner";
import { SERVER_URL } from "@/main";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { userdata } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const search = searchParams.get("search");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search?.toLowerCase() || "")
  );

  useEffect(() => {
    if (!userdata) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/blogs/all`, {
          withCredentials: true,
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, [userdata]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 dark:bg-neutral-800 px-6 md:px-20 py-10">
        <h1 className="text-4xl font-bold mb-10">Latest Blogs</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
            >
              <img
                src={blog.image}
                alt="blog"
                className="h-52 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold line-clamp-2 dark:text-black">
                  {blog.title}
                </h2>

                <div
                  className="text-gray-600 dark:text-gray-500 text-sm mt-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content) }}
                ></div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 text-sm font-medium mt-4 inline-block">
                    Read More →
                  </span>
                  <div className="flex gap-3">
                    {userdata?.role === "admin" && (
                      <>
                        <SquarePen
                          className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-blog/${blog._id}`);
                          }}
                        />
                        <Trash2
                          className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                "Are you sure you want to delete this blog?"
                              )
                            ) {
                              try {
                                await axios.delete(
                                  `http://localhost:5000/api/blogs/delete/${blog._id}`,
                                  { withCredentials: true }
                                );
                                setBlogs((prev) =>
                                  prev.filter((b) => b._id !== blog._id)
                                );
                                toast.success("Blog deleted successfully");
                              } catch (err) {
                                console.log(err);
                                toast.error("Failed to delete blog");
                              }
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
