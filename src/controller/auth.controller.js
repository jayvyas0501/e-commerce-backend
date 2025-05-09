import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { hashPassword, isPasswordValid } from "../utils/Bcrypt.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const signup = wrapAsync(async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already in use", success: false });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully!",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while signing up!",
      success: false,
    });
  }
});

export const login = wrapAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "This email does not exist!",
        success: false,
      });
    }
    const checkPass = isPasswordValid(password, user.password);

    if (!checkPass) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password!" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful!",
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while login!",
      success: false,
    });
  }
});
