const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // make sure to store the decoded user here
    //res.status(200).json({success:true,message:"User is Verified",user:req.user});
    next();
  } catch (error) {
    console.log("Token verification failed ::", error.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyUser;
