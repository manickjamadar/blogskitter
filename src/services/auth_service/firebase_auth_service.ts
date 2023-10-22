import AuthError, { AuthErrorCode } from "@/domain/error/auth_error";
import IAuthService from "./i_auth_service";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import UserModel from "@/domain/models/user";

class FirebaseAuthService implements IAuthService {
  async getUserToken(): Promise<string | AuthError> {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error("error");
      }
      return token;
    } catch (error) {
      return new AuthError(AuthErrorCode.invalidUser);
    }
  }
  async signup(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthError | UserModel> {
    const { name, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await signOut(auth);
      await this.signin(data);
      return { id: userCredential.user.uid, email, name };
    } catch (error) {
      const errorCode = (error as any).code || AuthErrorCode.unknown;
      return new AuthError(errorCode);
    }
  }
  async signin(data: {
    email: string;
    password: string;
  }): Promise<AuthError | UserModel> {
    const { email, password } = data;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.email || !user.displayName) {
        throw new AuthError(AuthErrorCode.invalidUser);
      }
      return { id: user.uid, email: user.email, name: user.displayName };
    } catch (error) {
      const errorCode = (error as any).code || AuthErrorCode.unknown;
      return new AuthError(errorCode);
    }
  }
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
