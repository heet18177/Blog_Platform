import express from "express";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(cookieParser());

app.use(
  cors({
   origin : ["http://localhost:5173", "https://blog-platform-git-main-heet18177s-projects.vercel.app"],
    credentials: true,
  })
);

import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";

app.use("/api/auth", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/comments", commentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
