import ApiError from "@/domain/error/api_error";
import IApiAuthService from "./i_api_auth_service";
import { adminAuth } from "@/config/firebase_admin";
import UserModel from "@/domain/models/user";

class FirebaseApiAuthService implements IApiAuthService {
  async getUserById(id: string): Promise<ApiError | UserModel> {
    try {
      const user = await adminAuth.getUser(id);
      if (!user.displayName || !user.email) {
        return new ApiError("User is invalid", 400);
      }
      return { id: user.uid, name: user.displayName, email: user.email };
    } catch (error) {
      return new ApiError("User not found", 404);
    }
  }
  async getUserId(
    token: string | null | undefined
  ): Promise<string | ApiError> {
    try {
      if (!token) {
        throw new Error("Error");
      }
      const { uid } = await adminAuth.verifyIdToken(token);
      return uid;
    } catch (error) {
      return new ApiError("Token is invalid", 401);
    }
  }
}

export default FirebaseApiAuthService;
