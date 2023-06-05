import { User } from "../model/user.js";
import UserService from "../services/user-service.js";

class UserRepository {
  async create(data) {
    try {
      const alreadyPresent = await User.findOne({
        username: data.username,
      });
      if (alreadyPresent) {
        console.log("username not available");
        throw "username not available";
      }
      console.log("here");
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("error in repository layer", error);
      throw { error };
    }
  }

  async getByUsername(username) {
    try {
      const user = await User.findOne({
        username,
      });
      return user;
    } catch (error) {
      console.log("something wrong in repository layer");
      throw { error };
    }
  }
  async getById(userId) {
    try {
      console.log(userId);
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log("something wrong in repository layer");
      throw { error };
    }
  }

  async getAllUsers() {
    try {
      const user = await User.find({});
      return user;
    } catch (error) {
      console.log("something wrong in repository layer");
      throw { error };
    }
  }
}

export default UserRepository;
