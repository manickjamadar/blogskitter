import UserModel from "@/domain/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user?: UserModel;
  state: "loading" | "loggedin" | "loggedout";
}

const initialState: AuthState = {
  user: undefined,
  state: "loading",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuthenticating: (state) => {
      state.state = "loading";
    },
    login: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
      state.state = "loggedin";
    },
    logout: (state) => {
      state.user = undefined;
      state.state = "loggedout";
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
export default AuthSlice;
