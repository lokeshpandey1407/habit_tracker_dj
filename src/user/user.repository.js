import UserModel from "./user.schema.js";

export default class UserRepository {
  // Repository create user function
  async createUser(name, username, password) {
    const user = await UserModel.create({ name, username, password });
    return user;
  }

  // Repository find user by userId function
  async findUserById(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  // Repository function to find user by username
  async findUserByUsername(username) {
    const user = await UserModel.findOne({ username }).populate(
      "name username"
    );
    return user;
  }
}
