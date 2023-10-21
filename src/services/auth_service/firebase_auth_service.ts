import AuthError, { AuthErrorCode } from "@/domain/error/auth_error";
import IAuthService from "./i_auth_service";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

class FirebaseAuthService implements IAuthService {
  async loginWithGoogle(): Promise<AuthError | undefined> {
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      const errorCode = (error as any).code || AuthErrorCode.unknown;
      return new AuthError(errorCode);
    }
  }
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
