import express from "express";
const router = express.Router();
import {
  signIn,
  signup,
  getAll,
  isAuthenticated,
} from "../../controller/user-controller.js";

router.post("/signUp", signup);
router.post("/signIn", signIn);
router.get("/getAll", getAll);

router.get("/isAuth", isAuthenticated);

export default router;
