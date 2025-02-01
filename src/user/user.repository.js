import UserModel from "./user.schema.js";

export default class UserRepository {
  async createUser(name, username, password) {
    const user = await UserModel.create({ name, username, password });
    return user;
  }
  async findUserById(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async findUserByUsername(username) {
    const user = await UserModel.findOne({ username }).populate(
      "name username"
    );
    return user;
  }
}
