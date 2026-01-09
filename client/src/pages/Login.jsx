import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { setUserdata } from "@/redux/Userslice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("User login successfull...");

      // Fetch user data after successful login to ensure state is updated before navigation
      try {
        const userResult = await axios.get(
          "http://localhost:5000/api/auth/get-current-user",
          { withCredentials: true }
        );
        if (userResult.data && userResult.data.user) {
          dispatch(setUserdata(userResult.data.user));
          // Use setTimeout to ensure state update propagates before navigation
          setTimeout(() => {
            navigate("/blog");
          }, 0);
        } else {
          navigate("/blog");
        }
      } catch (userError) {
        console.log("Error fetching user data:", userError);
        navigate("/blog");
      }

      console.log(result.data);
      // Clear form after successful signup
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      // Show actual error message from server
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "User Authentication is failed...";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <Navbar />

      <div className="bg-slate-200 h-screen dark:bg-black">
        <div className="flex justify-evenly items-center">
          <div>
            <img
              src="/auth.jpg"
              alt="authlogo"
              className="md:w-150 hidden md:block rounded-full mt-13"
            />
          </div>

          {/* form */}

          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center border border-gray-400 rounded-xl h-fit w-fit px-6 py-5 mt-15 shadow-2xl"
          >
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-3 text-gray-600 dark:text-">
              Enter your details below for login
            </p>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="px-2 py-2 border border-gray-400 rounded-lg mt-4 w-full"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              className="px-2 py-2 border border-gray-400 rounded-lg mt-4 w-full"
            />

            <div className="flex gap-1 items-center justify-center mt-4">
              <input type="checkbox" className="" />
              <span className="ml-1">
                I agree to the Terms and Privacy Policy
              </span>
            </div>

            <Button type="submit" className="mt-4 w-full cursor-pointer">
              Login
            </Button>

            <p className="mt-4">
              You have already account?{" "}
              <Link to="/signup" className="text-blue-700">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
