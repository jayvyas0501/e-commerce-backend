import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { hashPassword, isPasswordValid } from "../utils/Bcrypt.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { emailToken } from "../utils/jwtToken.js";
import { emailQueue } from "../queues/email.queue.js";
import dotenv from "dotenv"
dotenv.config()


export const signup = wrapAsync(async (req, res) => {
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
    isVerified: false,
  });
  const emailtoken = await emailToken(newUser);
  console.log(emailtoken);
  
  const url = `${process.env.CLIENT_URL}/verify-email?token=${emailtoken}`;
  await emailQueue.add("sendVerification", {
    to:email,
    subject: "Verify your email",
    html: `<p>Hello ${name},</p><p>Please <a href="${url}">click here</a> to verify your email. This link will expire in 15 minutes.</p>`,
  });
  res.status(201).json({
    message: "E-mail sent, please verify in your mail!",
    success: true,
  });
});

export const verifyEmail = wrapAsync(async (req, res) => {
  const { token } = req.query;
  const decode = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
  const user = await userModel.findById(decode.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (user.isVerified) {
    return res
      .status(400)
      .json({ success: false, message: "Email already verified" });
  }
  user.isVerified = true;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "This email does not exist!",
      success: false,
    });
  }
  if (!user.isVerified) {
    return res.status(401).json({
      message: "you are not verified!",
      success: false,
    });
  }
  const checkPass = await isPasswordValid(password, user.password);

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
});
