import express from "express";
const router = express.Router();
import { signIn, signup } from "../../controller/user-controller.js";

router.post("/signUp", signup);
router.post("/signIn", signIn);

export default router;
