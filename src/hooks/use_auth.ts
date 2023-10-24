import UserModel from "@/domain/models/user";
import AuthSelector from "@/store/selectors/auth_selector";
import { useAppSelector } from "@/store/store";

interface UseAuthReturnType {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  user?: UserModel;
  isAuthenticating: boolean;
}
const useAuth = (): UseAuthReturnType => {
  const isLoggedIn = useAppSelector(AuthSelector.isLoggedIn);
  const isLoggedOut = useAppSelector(AuthSelector.isLoggedOut);
  const isAuthenticating = useAppSelector(AuthSelector.isAuthenticating);
  const user = useAppSelector(AuthSelector.user);
  return {
    isLoggedIn,
    isLoggedOut,
    user,
    isAuthenticating,
  };
};
export default useAuth;
