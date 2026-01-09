import express from "express"
import { editProfile, getCurrentuser, login, logout, register } from "../controllers/userController.js";
import { loginValidater, registerValidater } from "../middleware/authValidation.js";
import { isAuth } from "../middleware/isAuth.js";
import singleUpload from "../middleware/multer.js";

const userRoute = express.Router();

userRoute.post('/register' , registerValidater , register);
userRoute.post('/login' , loginValidater , login);
userRoute.post("/logout" , logout);
userRoute.get("/get-current-user" , isAuth , getCurrentuser);
userRoute.put("/editProfile" , isAuth , singleUpload , editProfile)

export default userRoute;