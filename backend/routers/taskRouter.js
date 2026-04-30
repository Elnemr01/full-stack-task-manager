import express from 'express';
import { createTask, deleteTask, editTask, getAllTasks } from '../controllers/taskControllers.js';
import verifyToken from '../middlewares/verifyToken.js';
import { createTaskValidation } from '../middlewares/validator.js';
import { checkValidation } from '../middlewares/checkValidation.js';

const taskRouter = express.Router();


taskRouter.route("/").get(verifyToken,getAllTasks);
taskRouter.route("/create").post(verifyToken,createTaskValidation(),checkValidation,createTask);
taskRouter.route("/update/:id").put(verifyToken,createTaskValidation(),checkValidation,editTask);
taskRouter.route("/delete/:id").delete(verifyToken,deleteTask);

export default taskRouter;