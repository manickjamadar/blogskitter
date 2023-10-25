import ApiError from "@/domain/error/api_error";
import UserModel from "@/domain/models/user";

abstract class IApiAuthService {
  abstract getUserId(
    token: string | null | undefined
  ): Promise<string | ApiError>;
  abstract getUserById(id: string): Promise<UserModel | ApiError>;
}
export default IApiAuthService;
