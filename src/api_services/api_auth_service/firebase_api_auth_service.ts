import ApiError from "@/domain/error/api_error";
import IApiAuthService from "./i_api_auth_service";
import { adminAuth } from "@/config/firebase_admin";

class FirebaseApiAuthService implements IApiAuthService {
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
