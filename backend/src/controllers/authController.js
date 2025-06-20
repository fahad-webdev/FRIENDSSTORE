const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking for email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "E-mail is not registered..." });
    }
    //checking for password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //setup for JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    // 4. Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "productio",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        message: "Success! Login successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log("error login :: ", error);
    res.status(500).json({ message: "internal server error :: ",error });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password , role} = req.body;
  try {
     if (!firstName) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    } else if (!lastName) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    } else if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    } else if (!role) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "E-mail is already registered" });
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    });
    await user.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed." });
  }
};

const logout = async (req,res) =>{
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found..." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "User Fetch Successfully", users });
  } catch (error) {
    res.status(400).json({ message: "No User Found" });
    console.log("error fetching Users :: ", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    if (!deleteUser) {
      res.status(404).json({ success: false, message: "User Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error deleting product", error });
  }
};

module.exports = { register, login ,logout,userProfile, allUsers , deleteUser };
