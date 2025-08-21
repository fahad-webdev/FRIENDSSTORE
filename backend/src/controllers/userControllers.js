const User = require("../models/user.models");

const userProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }
    res.status(200).json({success:true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({success:false, message: "Error fetching user profile" });
  }
};

const updateUserProfile =async (req,res)=>{
  try {
    const { firstName, lastName, email, phone, address, profilePic } = req.body;
    const User = require("../models/user.models");
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Validate phone number if provided (must be exactly 11 digits)
    if (phone && !/^\d{11}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 11 digits"
      });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email, 
      _id: { $ne: req.user._id } 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered with another account"
      });
    }

    // Prepare update data
    const updateData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone || null,
      address: address || null,
      profilePic: profilePic || 'https://cdn-icons-png.flaticon.com/512/13078/13078067.png'
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profilePic: updatedUser.profilePic
      }
    });
  } catch (error) {
    console.log("Error updating user profile:", error);
    
    // Handle specific mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: validationErrors.join(', ')
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Failed to update user profile" 
    });
  }
}


module.exports = {userProfile,updateUserProfile};