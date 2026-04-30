import express from 'express';
import { loginUser, registerUser } from '../controllers/userControllers.js';
import { validateLoginUser, validateRegisterUser } from '../middlewares/validator.js';
import { checkValidation } from '../middlewares/checkValidation.js';
import { upload } from '../config/multer.config.js';

const userRouter = express.Router();


userRouter.route("/register").post(upload.single("avatar"),validateRegisterUser(),checkValidation,registerUser);
userRouter.route("/login").post(validateLoginUser(),checkValidation,loginUser);


export default userRouter;