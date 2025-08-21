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
        _id: user._id,
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
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production", // typo fixed
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        message: "Success! Login successful",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log("error login :: ", error);
    res.status(500).json({ message: "internal server error  ", error });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
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
      return res.status(400).json({ message: "E-mail is already registered" });
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

//for logout 
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error logging out: ", error);
    res.status(500).json({ message: "Logout failed" });
  }
};


// NEW: Verify route to check if user is authenticated
const verify = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User verified",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};

module.exports = { register, login, logout, verify };
