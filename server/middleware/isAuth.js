import jwt from 'jsonwebtoken'

export const isAuth = async(req,res,next)=>{
    try{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized access...",
        });
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = decoded
    

    next();
}
catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }
}


export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden - Admins only",
    });
  }

  next();
};
