import jwt from "jsonwebtoken";

export const generateToken = (res, user,message) => {
    console.log("Secret key->",process.env.SECRET_KEY)
    console.log("user->>>>>>>",user.id)
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
   const userData={
        id :user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
  return res
    .status(200).json({
        success:true,
        message,
        token,
        userData
    });
};