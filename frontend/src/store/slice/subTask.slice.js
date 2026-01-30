import { createSlice } from "@reduxjs/toolkit";
import { subTaskUrl } from "../../Api";

const subTaskSlice = createSlice({
  name: "subTask",
  initialState: {
    loading: false,
    subTask: {},
    subTaskError: null,
    subTaskMessage: null,
    isUpdated: false,
  },
  reducers: {
    // Add sub task
    addSubTaskRequest(state, action) {
      state.loading = true;
      state.subTaskMessage = null;
      state.subTaskError = null;
    },
    addSubTaskSuccess(state, action) {
      state.loading = false;
      state.subTask = action.payload.subTask;
      state.subTaskMessage = action.payload.message;
    },
    addSubTaskFailder(state, action) {
      state.loading = false;
      state.subTaskError = action.payload;
    },

    // Delete subtask
    deleteSubTaskRequest(state, action) {
      state.loading = true;
      state.subTaskMessage = null;
      state.subTaskError = null;
    },
    deleteSubTaskSuccess(state, action) {
      state.loading = false;
      state.subTask = {};
      state.subTaskMessage = action.payload;
    },
    deleteSubTaskFailder(state, action) {
      state.loading = false;
      state.subTaskError = action.payload;
    },

    // clear Error
    clearAllError(state, action) {
      state.subTaskError = null;
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

export const deleteSubTask = (subTaskID) => async (dispatch) => {
  dispatch(subTaskSlice.actions.deleteSubTaskRequest());
  try {
    const { data } = await subTaskUrl.delete(`/delete/${subTaskID}`, {
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

export default subTaskSlice.reducer;
