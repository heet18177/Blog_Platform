import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserdata } from "@/redux/Userslice";
import { SERVER_URL } from "@/main";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("User signup successfull...");

      try {
        const userResult = await axios.get(
          `${SERVER_URL}/api/auth/get-current-user`,
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
      // Save token to localStorage
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

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

      <div className="bg-slate-200 h-screen  dark:bg-black">
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
            onSubmit={handleSignup}
            className="flex flex-col justify-center items-center border border-gray-400 rounded-xl h-fit w-fit px-6 py-5 mt-15 shadow-2xl"
          >
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="mt-3 text-gray-600">
              Enter your details below for signup
            </p>

            <div className="flex gap-3 mt-4">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder="Enter firstname"
                className="px-2 py-2 border border-gray-400 rounded-lg w-full"
                required
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Enter lastname"
                className="px-2 py-2 border border-gray-400 rounded-lg w-full"
                required
              />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="px-2 py-2 border border-gray-400 rounded-lg mt-4 w-full"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              className="px-2 py-2 border border-gray-400 rounded-lg mt-4 w-full"
              required
            />

            <div className="flex gap-1 items-center justify-center mt-4">
              <input type="checkbox" className="" required />
              <span className="ml-1">
                I agree to the Terms and Privacy Policy
              </span>
            </div>

            <Button type="submit" className="mt-4 w-full cursor-pointer">
              Signup
            </Button>

            <p className="mt-4">
              You have already account?{" "}
              <Link to="/login" className="text-blue-700">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
