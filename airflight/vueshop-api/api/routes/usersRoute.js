import express from "express";
import checkIfAuthenticated from "../middleware/checkIfAuthenticated";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", userController.register);

userRouter.use(checkIfAuthenticated);

export default userRouter;
