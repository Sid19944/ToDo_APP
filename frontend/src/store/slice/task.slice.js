import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    tasks: [],
    task: {},
    isUpdated: false,
    taskError: null,
    taskMessage: null,
  },
  reducers: {
    // Get All Tasks
    getAllTaskRequest(state, action) {
      state.loading = true;
      state.taskError = null;
      state.taskMessage = null;
      state.isUpdated = false;
      state.task = {};
    },
    getAllTaskSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },
    getAllTaskFaild(state, action) {
      state.loading = false;
      state.taskError = action.payload;
      state.taskMessage = null;
    },

    // Delete task
    deleteTaskRequest(state, action) {
      state.loading = true;
    },
    deleteTaskSuccess(state, action) {
      state.loading = false;
      state.taskMessage = action.payload;
    },
    deleteTaskFailed(state, action) {
      state.loading = false;
      state.taskError = action.payload;
    },

    // Task Done
    taskDoneSuccess(state, action) {
      state.isUpdated = true;
      state.taskMessage = action.payload.message;
    },
    taskDoneFailed(state, action) {
      state.isUpdated = false;
      state.taskError = action.payload;
      state.task = {};
    },

    // Add New Task
    taskAddRequest(state, action) {
      state.loading = true;
    },
    taskAddSuccess(state, action) {
      state.loading = false;
      state.taskMessage = action.payload.message;
      state.task = action.payload.task;
    },
    taskAddFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Edit task
    taskEditRequest(state, action) {
      state.loading = true;
    },
    taskEditSuccess(state, action) {
      state.loading = false;
      state.taskMessage = action.payload.message;
      state.task = action.payload.task;
      state.isUpdated = true
    },
    taskEditFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false
    },

    // taskForEdit
    taskForEdit(state,action){
      state.task = action.payload;
    },

    // Clear Error
    clearAllError(state, action) {
      state.taskError = null;
    },
  },
});

import { taskUrl } from "../../Api";

export const getAllTasks = () => async (dispatch) => {
  dispatch(taskSlice.actions.getAllTaskRequest());
  try {
    const { data } = await taskUrl.get("/getall", { withCredentials: true });
    dispatch(taskSlice.actions.getAllTaskSuccess(data.allTask));
    dispatch(taskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(taskSlice.actions.getAllTaskFaild(error.response.data.message));
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch(taskSlice.actions.deleteTaskRequest());
  try {
    const { data } = await taskUrl.delete(`/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(taskSlice.actions.deleteTaskSuccess(data.message));
    dispatch(taskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(taskSlice.actions.deleteTaskFailed(error.response.data.message));
  }
};

export const taskDone = (id, isCompleted) => async (dispatch) => {
  try {
    const { data } = await taskUrl.put(
      `/update/${id}`,
      { isCompleted: isCompleted },
      {
        withCredentials: true,
      },
    );
    dispatch(taskSlice.actions.taskDoneSuccess(data));
    dispatch(taskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(taskSlice.actions.taskDoneFailed(error.response.data.message));
  }
};

export const taskAdd = (task) => async (dispatch) => {
  dispatch(taskSlice.actions.taskAddRequest());
  try {
    const { data } = await taskUrl.post(`/add`, task, {
      withCredentials: true,
    });
    dispatch(taskSlice.actions.taskAddSuccess(data));
    dispatch(taskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(taskSlice.actions.taskAddFailed(error.response.data.message));
  }
};

export const getTaskForEditPage = (id,tasks)=> (dispatch)=>{
  const task = tasks.filter((task)=>task._id == id)
  dispatch(taskSlice.actions.taskForEdit(task[0]))
}

export const taskEdit = (id,task)=>async(dispatch)=>{
  dispatch(taskSlice.actions.taskEditRequest())
  try {
    const {data} = await taskUrl.put(`/update/${id}`,task,{withCredentials : true})
    dispatch(taskSlice.actions.taskEditSuccess(data))
    dispatch(taskSlice.actions.clearAllError())
  } catch (error) {
    dispatch(taskSlice.actions.taskEditFailed(error.response.data.message))
  }
}

export default taskSlice.reducer;
