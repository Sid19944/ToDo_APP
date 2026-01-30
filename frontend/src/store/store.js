import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slice/user.slice";
import taskReducer from "./slice/task.slice";
import subTaskReducer from "./slice/subTask.slice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    task: taskReducer,
    subTask: subTaskReducer,
  },
});
