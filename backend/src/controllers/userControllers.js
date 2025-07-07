const User = require("../models/user.models");

const userProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }
    res.status(200).json({success:true,user});
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({success:false, message: "Error fetching user profile" });
  }
};

module.exports = {userProfile};