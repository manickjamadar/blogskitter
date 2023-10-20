import UserModel from "@/domain/models/user";
import AuthSelector from "@/store/selectors/auth_selector";
import { AuthActions } from "@/store/slices/auth_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface UseAuthReturnType {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  user?: UserModel;
  logout: () => void;
  login: (user: UserModel) => void;
}
const useAuth = (): UseAuthReturnType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(AuthSelector.isLoggedIn);
  const isLoggedOut = useAppSelector(AuthSelector.isLoggedOut);
  const user = useAppSelector(AuthSelector.user);
  const logout = () => {
    dispatch(AuthActions.logout());
  };
  const login = (user: UserModel) => {
    dispatch(AuthActions.login({ user }));
  };
  return {
    isLoggedIn,
    isLoggedOut,
    user,
    logout,
    login,
  };
};
export default useAuth;
