export const AuthErrorCode = {
  invalidLoginCredentials: "auth/invalid-login-credentials",
  emailAlredyInUse: "auth/email-already-in-use",
  invalidUser: "auth/invalid-user",
  unknown: "auth/unknown-error",
};
const errorMessages = {
  [AuthErrorCode.invalidLoginCredentials]: "Email or Password is incorrect",
  [AuthErrorCode.emailAlredyInUse]: "User is already registered",
  [AuthErrorCode.invalidUser]: "User is invalid",
  [AuthErrorCode.unknown]: "Something Went Wrong",
};
class AuthError extends Error {
  public code: string;
  constructor(code: string) {
    super(errorMessages[code] || errorMessages[AuthErrorCode.unknown]);
    this.code = code;
  }
}
export default AuthError;
