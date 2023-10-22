import ApiError from "@/domain/error/api_error";

abstract class IApiAuthService {
  abstract getUserId(
    token: string | null | undefined
  ): Promise<string | ApiError>;
}
export default IApiAuthService;
