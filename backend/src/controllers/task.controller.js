import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Task } from "../model/task.schema.js";
import { SubTask } from "../model/subTask.schema.js";
import mongoose from "mongoose";
import httpCode from "http-status-codes";

// add new task
const addNewTask = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { title, category, todoDate } = req.body;

  if (!todoDate || !title || !category) {
    return next(new ErrorHandler("Please Enter All Feild", 400));
  }

  const task = await Task.create({
    userId: _id,
    title,
    todoDate,
    category,
  });

  if (!task) {
    return next(new ErrorHandler("Something Went Wrong", 500));
  }

  return res.status(200).json({
    success: true,
    message: "New Task Added",
    task,
  });
});

// get all task
const getAllTask = asyncHandler(async (req, res, next) => {
  const allTask = await Task.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "subtasks",
        localField: "_id",
        foreignField: "taskId",
        as: "subTask",
      },
    },
  ]);

  if (!allTask) {
    return next(new ErrorHandler("Something went wrong", 400));
  }
  return res.status(200).json({
    success: true,
    allTask,
  });
});

// edit task
const editTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const newData = {
    title: req.body?.title,
    category: req.body?.category,
    todoDate : req.body?.todoDate,
    isCompleted: req.body?.isCompleted,
  };

  const SubTasks = await SubTask.find({ taskId: id });
  const allIsNotComplete = SubTasks.some((sub) => !sub.isCompleted);

  if (allIsNotComplete) {
    return next(new ErrorHandler("sub task is not completed yet."));
  }

  const task = await Task.findByIdAndUpdate(id, newData, { new: true });
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 500));
  }

  return res.status(httpCode.ACCEPTED).json({
    success: true,
    message: newData.isCompleted
      ? "Task Mark as done"
      : "task Updated Successfully",
    task,
  });
});

// delete task
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const respo = await Task.findByIdAndDelete(id);
  if (!respo) {
    return next(new ErrorHandler("task Already deleted", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
  });
});

export { addNewTask, getAllTask, editTask, deleteTask };
