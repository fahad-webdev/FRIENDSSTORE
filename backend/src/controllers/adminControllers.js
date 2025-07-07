const User = require("../models/user.models");

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "User Fetch Successfully", users });
  } catch (error) {
    res.status(400).json({ message: "No User Found" });
    console.log("error fetching Users :: ", error);
  }
};

const createUser = async (req,res) =>{
    try {
        const {firstName, lastName, email, password , role} = req.body;
        if(!firstName||!lastName||!email||!password||!role){
            return res.status(400).json({success:false,message:"Please provide required credentials"});
        }
        const exist = await User.findOne({email});
        if(exist){
            return res.status(400).json({success:false,message:"E-mail is already registered"});
        }
        const user = new User({firstName, lastName, email, password , role});
        await user.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.log("Error! user creation failed ",error);
        res.status(404).json({success:false,message:"Error Creating User"});
    }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    if (!deleteUser) {
      res.status(404).json({ success: false, message: "User Not Found" });
    }else{
       res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error deleting product", error });
  }
};


module.exports = {
deleteUser,
allUsers,
createUser
};