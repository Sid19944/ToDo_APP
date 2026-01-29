import { Router } from "express";
const router = Router();

import {
  editSubtask,
  getAllSubTask,
  deleteSubTask,
  addNewSubTask
} from "../controllers/subTask.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

router.route("/getall").get(verifyJwt,getAllSubTask)
router.route("/add/:id").post(verifyJwt, addNewSubTask)
router.route("/update/:id").put(verifyJwt, editSubtask)
router.route("/delete/:id").delete(verifyJwt, deleteSubTask)

export default router;
