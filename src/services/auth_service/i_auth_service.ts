import AuthError from "@/domain/error/auth_error";
import UserModel from "@/domain/models/user";

abstract class IAuthService {
  abstract signout(): Promise<AuthError | undefined>;
  abstract loginWithGoogle(): Promise<AuthError | undefined>;
  abstract signup(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserModel | AuthError>;
  abstract signin(data: {
    email: string;
    password: string;
  }): Promise<UserModel | AuthError>;
  abstract getUserToken(): Promise<string | AuthError>;
}
export default IAuthService;
