import mongoose, { Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const SubTask = mongoose.model("SubTask", subTaskSchema);
