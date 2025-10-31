import jwt from "jsonwebtoken";

export const generateToken = (res, user,message) => {
    console.log(",,,,,,,,,,,,,,,,,,,,,,,",process.env.SECRET_KEY)
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200).json({
        success:true,
        message,
        token,
        user
    });
};