import jwt from "jsonwebtoken";
import UserRepository from "../user/user.repository.js";

const AuthMiddleware = async (req, res, next) => {
  const userRepository = new UserRepository();
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Missing Authorization header.",
      });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: Missing token." });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findUserById(payload.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid User or User not present." });
    }
    req.userId = payload.userId;
    req.name = payload.name;
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized: Invalid Token" });
  }
  next();
};
export default AuthMiddleware;
