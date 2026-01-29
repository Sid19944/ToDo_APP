import mongoose, { Schema } from "mongoose";
import { SubTask } from "./subTask.schema.js";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Personal", "Work"],
      required: true,
    },
    todoDate: Date,
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

taskSchema.post("findOneAndDelete", async (task) => {
  if (task) {
    await SubTask.deleteMany({ taskId: task._id });
  }
});

export const Task = mongoose.model("Task", taskSchema);
