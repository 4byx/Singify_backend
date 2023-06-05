import { UserRepository } from "../repository/index.js";

import { checkUsername } from "../utils/helper.js";

import { JWT_KEY } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const username = data.username;
      if (!checkUsername(username)) {
        console.log("username doesnt follow format");
        throw "username doesnt follow format";
      }
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something wrong in service layer");
      throw { error };
    }
  }

  async signin(data) {
    try {
      const { username, password } = data;
      // console.log(data);
      // check details using given username
      const user = await this.userRepository.getByUsername(username);
      // check if the user is present in the database or not
      // console.log(user);
      if (!user) {
        console.log("user not present");
        throw { error: "user not present" };
      }
      // if the password matches with givn user
      const response = await this.comparePassword(password, user.password);
      if (!response) {
        console.log("wrong password");
        throw { error: "password doesnt match" };
      }
      const token = await this.createToken({
        username: user.username,
        email: user.email,
      });
      return token;
      // create token and return token
    } catch (error) {
      console.log("something wrong in signing in service layer");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = await this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      console.log(response);
      const user = await this.userRepository.getByUsername(response.username);
      if (!user) {
        throw { error: "No such user find in database" };
      }
      return user;
    } catch (error) {
      console.log("something wrong in authencating user in service layer");
      throw { error };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      return users;
    } catch (error) {
      console.log("something wrong in signing in service layer");
      throw { error };
    }
  }

  async verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something wrong in verifying token");
      throw { error };
    }
  }

  async createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "2h" });
      return token;
    } catch (error) {
      console.log("something wrong in creating token", error);
      throw { error };
    }
  }

  async comparePassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compareSync(plainPassword, hashedPassword);
    } catch (error) {
      console.log("something wrong in comparing password");
      throw { error };
    }
  }
}

export default UserService;
