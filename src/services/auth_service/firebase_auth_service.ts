import AuthError, { AuthErrorCode } from "@/domain/error/auth_error";
import IAuthService from "./i_auth_service";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

class FirebaseAuthService implements IAuthService {
  async signout(): Promise<AuthError | undefined> {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      const errorCode = (error as any).code || AuthErrorCode.unknown;
      return new AuthError(errorCode);
    }
  }
}
export default FirebaseAuthService;
