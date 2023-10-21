import AuthError from "@/domain/error/auth_error";

abstract class IAuthService {
  abstract signout(): Promise<AuthError | undefined>;
}
export default IAuthService;
