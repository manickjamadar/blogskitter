import UserModel from "@/domain/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user?: UserModel;
}

const initialState: AuthState = {
  user: undefined,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
    },
    signup: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
export default AuthSlice;
