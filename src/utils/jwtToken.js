import jwt from "jsonwebtoken"
export const token = (newUser) => {
  return jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const emailToken = (newUser) => {
  return jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_EMAIL_SECRET,
    { expiresIn: "15m" }
  );
};
