import { auth } from "@/config/firebase";
import AuthError, { AuthErrorCode } from "@/domain/error/auth_error";
import UserModel from "@/domain/models/user";
import SigninSchema from "@/schemas/signin_schema";
import SignupSchema from "@/schemas/signup_schema";
import { useFormik } from "formik";
import React, { useState } from "react";
import GoogleAuthButton from "../google_auth_button/google_auth_button";
import { authService } from "@/services";
export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
interface Props {
  isSigningup: boolean;
  onSigninClick?: () => void;
  onSignupClick?: () => void;
  onSubmit?: (user: UserModel) => void;
}
const AuthForm: React.FC<Props> = ({
  isSigningup,
  onSigninClick,
  onSignupClick,
  onSubmit,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleGoogleLogin = async () => {
    const error = await authService.loginWithGoogle();
    if (error) {
      setErrorMessage(error.message);
    }
  };
  const initialValues: AuthFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: isSigningup ? SignupSchema : SigninSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      let userOrError: UserModel | AuthError;
      setErrorMessage("");
      if (isSigningup) {
        userOrError = await authService.signup({
          ...values,
          name: values.name || "Annonymous",
        });
      } else {
        userOrError = await authService.signin(values);
      }
      if (userOrError instanceof AuthError) {
        setErrorMessage(userOrError.message);
      } else {
        resetForm();
        setErrorMessage("");
        onSubmit && onSubmit(userOrError);
      }
      setSubmitting(false);
    },
  });
  return (
    <div className="p-10">
      <h1 className="text-center text-xl">BlogSkitter</h1>
      <p className="text-center mb-4 mt-2 text-sm text-gray-500">
        {isSigningup ? "Create your account" : "Sign In to your account"}
      </p>
      <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        {errorMessage && (
          <p className="bg-red-400 text-white rounded text-sm px-4 py-2">
            {errorMessage}
          </p>
        )}
        {isSigningup && (
          <div className="inputContainer">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={`${errors.name && touched.name ? "error" : "noError"}`}
            />
            {errors.name && touched.name && (
              <p className="inputErrorMessage mt-1">{errors.name}</p>
            )}
          </div>
        )}
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`${errors.email && touched.email ? "error" : "noError"}`}
          />
          {errors.email && touched.email && (
            <p className="inputErrorMessage mt-1">{errors.email}</p>
          )}
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`${
              errors.password && touched.password ? "error" : "noError"
            }`}
          />
          {errors.password && touched.password && (
            <p className="inputErrorMessage mt-1">{errors.password}</p>
          )}
        </div>
        {isSigningup && (
          <div className="inputContainer">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              className={`${
                errors.confirmPassword && touched.confirmPassword
                  ? "error"
                  : "noError"
              }`}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="inputErrorMessage mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="primaryButton w-full"
          disabled={isSubmitting}
        >
          {isSigningup ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <p className="text-center text-sm text-gray-600">
          {isSigningup ? "Already" : "Don't"} have an account?{" "}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => {
              isSigningup
                ? onSigninClick && onSigninClick()
                : onSignupClick && onSignupClick();
              setErrorMessage("");
            }}
          >
            {isSigningup ? "Sign In" : "Sign Up"}
          </span>
        </p>
        <p className="text-sm text-center text-gray-500">Or</p>
        <GoogleAuthButton onClick={handleGoogleLogin}>
          {isSigningup ? "Sign Up" : "Sign In"} With Google
        </GoogleAuthButton>
      </div>
    </div>
  );
};

export default AuthForm;
