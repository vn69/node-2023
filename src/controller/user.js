import userModel from "../models/user.js";
import bcrypt from "bcrypt";

export const updateUserPassword = async (req, res) => {
  const { password , newPassword } = req.body;
  const {userId} = req.user;
  console.log("req:::::", { password, newPassword, userId });
  try {
    if (!password || !newPassword) {
      throw new Error("Please provide all fields");
    }
    if (password === newPassword) {
      throw new Error("Please set the new password differently than the old one");
    }
    const user = await userModel.findOne({_id: userId});
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new Error("wrong password");
    }
    const pwHash = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS);
    const userUpdate = await userModel.findOneAndUpdate({_id: userId},{password: pwHash});
    userUpdate.password = "not show"
    console.log("userUpdate::::::; ", userUpdate);
    res.status(200).json({
      success: true,
      data: userUpdate,
    });
  } catch (error) {
    console.log("error::::::::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await userModel.find({ role: 'user' }).select('-password');
  res.status(200).json({
    success: true,
    data: users
  });
};


export const showMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

export const getUserById = async (req, res) => {
  const userId = req.params.id
  console.log("userId::::::", userId);
  try {
    const user = await userModel.findById(userId).select("-password");
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user not found",
    })
  }
};