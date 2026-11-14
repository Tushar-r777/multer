const userModel = require("../models/userSchema");

function formatUser(user){
  return{
    id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    address: user.address,
    phone: user.phone,
    gender: user.gender,
    dob: user.dob,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

const getAllUserController = async (req, res) => {
  try {
    const loggedinUserId = req.user.id

    const loggedinUser = await userModel.findById(loggedinUserId)

    const search = req.query.search ? req.query.search.trim() : ""

    const page = 1
    const limit = 5

    const filter = {
       _id: {$ne: loggedinUserId}
    }

     if ( search ){
         const searchRegex = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
         filter.$or = [
          {username: {$regex: searchRegex, $options: "i"}},
          {email: {$regex: searchRegex, $options: "i"}}
         ]
     }

    const users = await userModel.find(
       filter
    )

     

    res.status(200).json({
        success: true,
        message: "Users get successfully",
        data: {
          users: users.map(formatUser),
          length: users.length
        },
        loggedinuser: loggedinUser
    })
  } catch (error) {
      res.send("catch error")
    
  }
};

const getSingleUserController = async (req, res) => {
   const UserId = req.params.id
    try {
    const users = await userModel.findOne({
      _id: UserId
    })
    res.status(200).json({
        success: true,
        message: "Users get successfully",
        data: user,
    })
  } catch (error) {
      res.status(409).json({
        success: false,
        message: error.message,
        UserId: UserId
      })
    
  }
}


const approvedUserController = async (req,res) => {
   try {
    let updateUser = userModel.findByIdAndUpdate(
    req.params.id,
    {status: true},
    {
      new:true,
      runValidators: true,
    }
  )
  res.status(200).json({
    success: true,
    message: "user approved",
    data: updateUser
  })

   } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    })
   }
}


const deactiveUserController = async (req,res) => {
   try {
    const updateUser = userModel.findByIdAndUpdate(req.params.id,);
  res.status(200).json({
    success: false,
    message: "user deactivated",
  })

   } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    })
   }
}


const UserDeleteController = async (req,res) => {
   try {
    const deleteUser = userModel.findByIdAndDelete(req.params.id,);
  res.status(200).json({
    success: true,
    message: "user deleted",
  })

   } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    })
   }
}

module.exports = {
    getAllUserController, getSingleUserController, approvedUserController,UserDeleteController,deactiveUserController
}