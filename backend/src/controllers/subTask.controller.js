import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { SubTask } from "../model/subTask.schema.js";

// create new subtask
const addNewSubTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new ErrorHandler("Please enter Details.", 400));
  }
  const subTask = await SubTask.create({ taskId: id, title, description });
  if (!subTask) {
    return next(new ErrorHandler("Something Went Wrong", 500));
  }
  return res.status(200).json({
    success: true,
    message: "Sub Task created",
    subTask,
  });
});

// edit subtask
const editSubtask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const newData = {
    title: req.body?.title,
    description: req.body?.description,
    isCompleted: req.body?.isCompleted,
  };

  const allSubTasks = await SubTask.findByIdAndUpdate(id, newData, {
    new: true,
  });
  if (!allSubTasks) {
    return next(new ErrorHandler("something went wrong", 500));
  }

  return res.status(200).json({
    success: true,
    message: newData.isCompleted
      ? "Subtask marked as completed"
      : "Sub task updated.",
  });
});

// get all subtask for task
const getAllSubTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const allSubTask = await SubTask.find({ taskId: id });
  if (!allSubTask) {
    return next(new ErrorHandler("Invalid task Id", 400));
  }

  return res.status(200).json({
    success: true,
    message: "all sub task found",
    allSubTask,
  });
});

// delete subtask
const deleteSubTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subtask = await SubTask.findByIdAndDelete(id);
  if (!subtask) {
    return next(new ErrorHandler("Invalid sub task ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Sub Task Deleted.",
  });
});

export { editSubtask, getAllSubTask, deleteSubTask, addNewSubTask };
