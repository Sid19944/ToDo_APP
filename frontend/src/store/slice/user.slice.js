import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
    isUpdated: false,
  },

  reducers: {
    // Get User
    getUserRequest(state, action) {
      state.loading = true;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Logout
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
      state.message = null;
    },

    // Clear error
    clearAllError(state, action) {
      state.error = null;
    },
  },
});

import { userUrl } from "../../Api";

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await userUrl.get("/user/me", { withCredentials: true });
    dispatch(userSlice.actions.getUserSuccess(data?.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed(error.response.data.message));
  }
};

export const logoutUser = ()=>async(dispatch)=>{
  try {
    const {data} = await userUrl.post("/user/logout",{withCredentials : true});
    dispatch(userSlice.actions.logoutSuccess(data.message))
    dispatch(userSlice.actions.clearAllError())
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message))
  }
}

export default userSlice.reducer;
