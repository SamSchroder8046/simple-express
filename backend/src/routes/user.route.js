import { Router } from "express";
import { registerUser, logInUser, logOutUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/logIn").post(logInUser);
router.route("/logOut").post(logOutUser);

export default router;