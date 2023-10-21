import UserModel from "@/domain/models/user";
import AuthSelector from "@/store/selectors/auth_selector";
import { useAppSelector } from "@/store/store";

interface UseAuthReturnType {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  user?: UserModel;
}
const useAuth = (): UseAuthReturnType => {
  const isLoggedIn = useAppSelector(AuthSelector.isLoggedIn);
  const isLoggedOut = useAppSelector(AuthSelector.isLoggedOut);
  const user = useAppSelector(AuthSelector.user);
  return {
    isLoggedIn,
    isLoggedOut,
    user,
  };
};
export default useAuth;
