import multer from "multer";

const singleUpload = multer({ dest: "uploads/" }).single("image");

export default singleUpload;
