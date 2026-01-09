import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
    <div
      className="flex h-screen justify-evenly md:items-center md:px-20 sm:px-10 px-5 
  bg-slate-100 dark:bg-black"
    >
      <div className="flex flex-col gap-3 w-150 mt-5">
        <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold ">
          Explore the latest Tech and Web Articles
        </h1>
        <p className="md:text-lg text-gray-500 dark:text-gray-400">
          Stat ahead with in-depth articles, tutorials, and insights on web
          development , digital marketing and tech innovation.
        </p>

        <div className="flex gap-4 items-center mt-2">
          <Button
            onClick={() => {
              navigate("/blog");
            }}
            className=" cursor-pointer"
          >
            Get started
          </Button>
          <Button onClick={() => navigate("/about")} className=" cursor-pointer" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      <div>
        <img
          src="/blog2.png"
          alt="blog2"
          className="md:w-120 hidden md:block"
        />
      </div>

    </div>
    </div>
  );
};

export default Home;
