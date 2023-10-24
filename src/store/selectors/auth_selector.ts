import { RootState } from "../store";

class AuthSelector {
  static isLoggedIn = (state: RootState) => !!state.auth.user;
  static isLoggedOut = (state: RootState) => state.auth.user === undefined;
  static user = (state: RootState) => state.auth.user;
  static isAuthenticating = (state: RootState) =>
    state.auth.state === "loading";
}
export default AuthSelector;
