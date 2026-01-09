import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "@/redux/Userslice";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/TiptapEditor";
import { useTheme } from "@/context/ThemeContext";
import { getNavLinks } from "@/lib/navLinks";

const AdminPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setUserdata(null));
      toast.success("User logout successful...");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const addPost = async (e) => {
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

      const result = await axios.post(
        "http://localhost:5000/api/blogs/create",
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Post added successfully...");
      navigate("/blog");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
      <header className="w-full sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow px-4 md:px-20 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/myLogo.svg" alt="logo" className="w-10" />
            <p className="font-bold text-xl text-black dark:text-white">
              ArticleX
            </p>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center gap-2 w-[40%]">
            <input
              type="text"
              className="px-3 py-2 w-full rounded-lg border border-gray-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
            <Button>
              <FaSearch />
            </Button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-4 font-semibold text-black dark:text-white">
              {getNavLinks(userdata).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </Button>

            {userdata ? (
              <>
                {userdata.role === "admin" && (
                  <Button onClick={() => navigate("/admin")}>Admin</Button>
                )}
                <Button onClick={logout} className="cursor-pointer">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer"
                >
                  Signup
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-black dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4 text-black dark:text-white">
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 dark:border-neutral-700 dark:bg-neutral-800"
              placeholder="Search"
            />

            <ul className="flex flex-col gap-3 font-semibold">
              {getNavLinks(userdata).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </Button>
              {userdata ? (
                <>
                  {userdata.role === "admin" && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/admin");
                        setMenuOpen(false);
                      }}
                    >
                      Admin
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/signup");
                      setMenuOpen(false);
                    }}
                  >
                    Signup
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white text-center">
          Create New Post
        </h1>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={addPost} className="flex flex-col gap-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Blog Cover Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors
              ${
                imagePreview
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                  : "border-gray-300 dark:border-neutral-600 hover:border-gray-400 dark:hover:border-neutral-500"
              }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
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
                      <p className="text-gray-500 dark:text-gray-400">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
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
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              <TiptapEditor
                content={content}
                onChange={setContent}
                className="mb-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold mt-2"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
