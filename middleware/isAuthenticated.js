import jwt from "jsonwebtoken";
export const isAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth",authHeader)
  if (authHeader && authHeader.startsWith("Bearer ")) {

    const token = authHeader.split(" ")[1];
    console.log('token',token)
    try {
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      console.log("Decoded JWT:", decoded);
      req.userId = decoded.userId;
      console.log("userID :", req.userId);
     
      next();
    } catch (err) {
      console.log("JWT verification failed:", err);
      return res.status(401).send("Token invalid");
    }
  } else {
    return res.status(401).send("No token");
  }
};