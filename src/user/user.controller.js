import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  generateToken(id, name) {
    const token = jwt.sign(
      {
        userId: id,
        name: name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    return token;
  }

  async signUp(req, res, next) {
    const { name, username, password } = req.body;
    try {
      if (!name || !username || !password) {
        return res.status(400).send({
          success: false,
          message:
            "Required fields ( name, username and password ) must be provided.",
        });
      }
      const user = await this.userRepository.createUser(
        name,
        username,
        password
      );
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Unable to create User. Please try again",
        });
      }
      return res
        .status(201)
        .send({ success: true, message: "Account created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Required field must be provided" });
    }
    try {
      const user = await this.userRepository.findUserByUsername(username);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid username. Please check the username and try again",
        });
      }
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        return res.status(400).send({
          success: false,
          message: "Invalid password. Please check the password and try again",
        });
      }
      const token = this.generateToken(user._id, user.name);
      return res.status(200).send({
        success: true,
        token,
        message: "User signed in successfully",
      });
    } catch (error) {}
  }
}
