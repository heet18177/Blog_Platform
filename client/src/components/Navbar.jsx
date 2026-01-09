import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "@/redux/Userslice";
import { CgProfile } from "react-icons/cg";
import { useTheme } from "@/context/ThemeContext";
import SearchForm from "./SearchForm";
import { getNavLinks } from "@/lib/navLinks";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const navLinks = getNavLinks(userdata);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUserdata(null));
      toast.success("User logout successful...");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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

        {/* 🔍 Desktop Search */}
        <SearchForm className="hidden md:flex w-[40%]" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex gap-4 font-semibold text-black dark:text-white">
            {navLinks.map((link) => (
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

          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </Button>

          {userdata ? (
            <>
              {userdata.role === "admin" && (
                <Button
                  variant="outline"
                  onClick={() => navigate("/AdminPage")}
                >
                  Add posts
                </Button>
              )}

              {/* 👤 Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="text-2xl text-black dark:text-white"
                >
                  <CgProfile />
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate("/EditProfile");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-neutral-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
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

      {/* 🔍 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 pb-4 text-black dark:text-white">
          <SearchForm onSearchSubmit={() => setMenuOpen(false)} />

          <ul className="flex flex-col gap-3 font-semibold">
            {[...navLinks, { label: "Edit Profile", path: "/EditProfile" }].map(
              (link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </Button>

            {userdata ? (
              <Button
                className="w-full"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </Button>
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
  );
};

export default Navbar;
