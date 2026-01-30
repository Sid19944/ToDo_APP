import { createSlice } from "@reduxjs/toolkit";
import { subTaskUrl } from "../../Api";

const subTaskSlice = createSlice({
  name: "subTask",
  initialState: {
    subLoading: false,
    subTask: {},
    subTaskError: null,
    subTaskMessage: null,
    isUpdated: false,
  },
  reducers: {
    // Add sub task
    addSubTaskRequest(state, action) {
      state.subLoading = true;
      state.subTaskMessage = null;
      state.subTaskError = null;
    },
    addSubTaskSuccess(state, action) {
      state.subLoading = false;
      state.subTask = action.payload.subTask;
      state.subTaskMessage = action.payload.message;
    },
    addSubTaskFailder(state, action) {
      state.subLoading = false;
      state.subTaskError = action.payload;
    },

    // Delete subtask
    deleteSubTaskRequest(state, action) {
      state.subLoading = true;
      state.subTaskMessage = null;
      state.subTaskError = null;
    },
    deleteSubTaskSuccess(state, action) {
      state.subLoading = false;
      state.subTask = {};
      state.subTaskMessage = action.payload;
    },
    deleteSubTaskFailder(state, action) {
      state.subLoading = false;
      state.subTaskError = action.payload;
    },

    // subTask Done
    subTaskEditRequest(state, action) {
      state.subLoading = true;
    },
    subTaskEditSuccess(state, action) {
      state.subLoading = false;
      state.isUpdated = true;
      state.subTaskMessage = action.payload;
    },
    subTaskEditFailed(state, action) {
      state.subLoading = false;
      state.isUpdated = false;
      state.subTaskError = action.payload;
    },

    // select SubTask
    selectSubTask(state, action) {
      state.subTask = action.payload;
    },

    // clear Error
    clearAllError(state, action) {
      state.subTaskError = null;
    },
    clearAllMsg(state, action) {
      state.subTaskMessage = null;
    },
  },
});

export const addSubTask = (taskId, subTask) => async (dispatch) => {
  dispatch(subTaskSlice.actions.addSubTaskRequest());
  try {
    const { data } = await subTaskUrl.post(`/add/${taskId}`, subTask, {
      withCredentials: true,
    });
    dispatch(subTaskSlice.actions.addSubTaskSuccess(data));
    dispatch(subTaskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      subTaskSlice.actions.addSubTaskFailder(error.response.data.message),
    );
  }
};

export const deleteSubTask = (subTaskId) => async (dispatch) => {
  dispatch(subTaskSlice.actions.deleteSubTaskRequest());
  try {
    const { data } = await subTaskUrl.delete(`/delete/${subTaskId}`, {
      withCredentials: true,
    });
    dispatch(subTaskSlice.actions.deleteSubTaskSuccess(data.message));
    dispatch(subTaskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      subTaskSlice.actions.deleteSubTaskFailder(error.response.data.message),
    );
  }
};

export const selectSubTaskToEdit = (subTaskId, taskId, tasks) => (dispatch) => {
  const task = tasks.filter((task) => task._id == taskId);
  const subTask = task[0].subTask.filter((sub) => sub._id == subTaskId);
  dispatch(subTaskSlice.actions.selectSubTask(subTask[0]));
};

export const editSubTask = (subTaskId, newData) => async (dispatch) => {
  dispatch(subTaskSlice.actions.subTaskEditRequest());
  try {
    const { data } = await subTaskUrl.put(`/update/${subTaskId}`, newData, {
      withCredentials: true,
    });
    dispatch(subTaskSlice.actions.subTaskEditSuccess(data.message));
    dispatch(subTaskSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      subTaskSlice.actions.subTaskEditFailed(error.response.data.message),
    );
  }
};

export const clearSubMsg = () => (dispatch) => {
  dispatch(subTaskSlice.actions.clearAllMsg());
};

export default subTaskSlice.reducer;
