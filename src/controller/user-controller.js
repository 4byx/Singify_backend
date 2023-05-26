import { UserService } from "../services/index.js";

const userService = new UserService();

export const signup = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await userService.create(data);
    return res.status(200).json({
      Success: true,
      data: user,
      message: "successfully created a user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to create a user",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    const response = await userService.signin(data);
    return res.status(201).json({
      Success: true,
      data: response,
      message: "successfully signed in a user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to signed in a user",
      err: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json({
      Success: true,
      data: response,
      message: "successfully fetched all the users",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      data: [],
      message: "failed to fetch all the users",
      err: error,
    });
  }
};
