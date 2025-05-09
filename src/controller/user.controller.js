import cloudinary from "../config/cloudinaryConfig.js";
import profileModel from "../model/profile.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createProfile = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  const { phone, address, dateOfBirth, gender } = req.body;
  const avatar = req.file?.path;
  const existingProfile = await profileModel.findOne({ user: userId });
  if (existingProfile) {
    return res.status(400).json({
      success: false,
      message: "profile already exist!",
    });
  }
  const profile = await profileModel.create({
    user: userId,
    phone,
    avatar,
    address,
    dateOfBirth,
    gender,
  });
  res.status(201).json({
    success: true,
    message: "profile created successfully!",
    data: profile,
  });
});

export const getProfile = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const userProfile = await profileModel.findById(id).populate({
    path: "user",
    select: "name email role",
  });

  if (!userProfile) {
    return res.status(404).json({
      success: false,
      message: "User profile not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "User profile recieved!",
    data: userProfile,
  });
});

export const updateProfile = wrapAsync(async (req, res) => {
  const profileId = req.params.id;
  const { phone, address, dateOfBirth, gender } = req.body;

  let avatar;
  let avatarPublicId;

  const profile = await profileModel.findById(profileId);

  if (!profile) {
    throw new Error("Profile not found!");
    
    return res.status(404).json({
      message: "profile not found!",
      success: false,
    });
  }

  if (req?.file) {
    if (profile.avatarPublicId) {
      await cloudinary.uploader.destroy(profile.avatarPublicId);
    }
    avatar = req.file.path;
    avatarPublicId = req.file.filename;

    profile.avatar = avatar;
    profile.avatarPublicId = avatarPublicId;
  }

  profile.phone = phone || profile.phone;
  profile.address = address || profile.address;
  profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
  profile.gender = gender || profile.gender;
  profile.phone = phone || profile.phone;

  const updatedProfile = await profile.save();

  res.status(200).json({
    success: true,
    message: "profile updated successfully!",
    data: updatedProfile,
  });
});
