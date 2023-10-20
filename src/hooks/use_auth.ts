import UserModel from "@/domain/models/user";
import AuthSelector from "@/store/selectors/auth_selector";
import { AuthActions } from "@/store/slices/auth_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface UseAuthReturnType {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  user?: UserModel;
  logout: () => void;
  signup: (user: UserModel) => void;
  signin: (user: UserModel) => void;
}
const useAuth = (): UseAuthReturnType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(AuthSelector.isLoggedIn);
  const isLoggedOut = useAppSelector(AuthSelector.isLoggedOut);
  const user = useAppSelector(AuthSelector.user);
  const logout = () => {
    dispatch(AuthActions.logout());
  };
  const signup = (user: UserModel) => {
    dispatch(AuthActions.signup({ user }));
  };
  const signin = (user: UserModel) => {
    dispatch(AuthActions.signin({ user }));
  };
  return {
    isLoggedIn,
    isLoggedOut,
    user,
    logout,
    signup,
    signin,
  };
};
export default useAuth;
