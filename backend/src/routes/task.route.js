import { Router } from "express";
const router = Router();
import {
  addNewTask,
  getAllTask,
  editTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

router.route("/add").post(verifyJwt, addNewTask);
router.route("/getall").get(verifyJwt, getAllTask);
router.route("/update/:id").put(verifyJwt, editTask);
router.route("/delete/:id").delete(verifyJwt, deleteTask);

export default router;
