import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slice/user.slice";
import taskReducer from "./slice/task.slice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    task: taskReducer,
  },
});
