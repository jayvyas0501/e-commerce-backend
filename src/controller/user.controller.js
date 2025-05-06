import profileModel from "../model/profile.model.js";

export const createProfile = async (req,res) => {
  try {
    const userId = req.user.id
    const {phone,avatar,address,dateOfBirth,gender} = req.body;
    const existingProfile = await profileModel.findOne({user:userId})
    if(existingProfile){
      res.status(400).json({
        success: false,
        message: "profile already exist!",
      });
    }
    const profile = await profileModel.create({
      user:userId,
      phone,
      avatar,
      address,
      dateOfBirth,
      gender
    })
    res.status(201).json({
      success: true,
      message: "profile created successfully!",
      data:profile
    });

  } catch (error) {
    console.log("create profile : " + error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating user profile!",
    });
  }
}

export const getProfile = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting user profile!",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const {phone, avatar, address, dateOfBirth, gender} = req.body;
    const updatedProfile = await profileModel.findByIdAndUpdate(profileId,{phone, avatar, address, dateOfBirth, gender},{new:true})
    res.status(200).json({
      success: true,
      message: "profile updated successfully!",
      data: updatedProfile
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating user profile!",
    });
  }
};
