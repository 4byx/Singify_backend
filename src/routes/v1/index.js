import express from "express";
const router = express.Router();
import { signIn, signup, getAll } from "../../controller/user-controller.js";

router.post("/signUp", signup);
router.post("/signIn", signIn);
router.get("/getAll" , getAll);

export default router;
