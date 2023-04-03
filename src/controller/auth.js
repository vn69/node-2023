import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("req:::::", { email, password });
  try {
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await userModel.findOne({ email });

    console.log("user:::::", user);
    if (!user) {
      throw new Error("email not found");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new Error("wrong password");
    }

    // token
    const userTokenData = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    console.log("userTokenData::::", userTokenData);
    const token = jwt.sign(
      {
        user: userTokenData,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1 day" }
    );
    res.status(200).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log("error::::::::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("req:::::", { email, password });
  try {
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const emailAlreadyExists = await userModel.findOne({ email });

    console.log("emailAlreadyExists:::::", emailAlreadyExists);
    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }
    const role = "user";
    const pwHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
    const user = await userModel.create({ email, password: pwHash, role });
    user.password = "not show";
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("error::::::::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
