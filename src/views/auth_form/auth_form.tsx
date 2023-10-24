import AuthError from "@/domain/error/auth_error";
import UserModel from "@/domain/models/user";
import SigninSchema from "@/schemas/signin_schema";
import SignupSchema from "@/schemas/signup_schema";
import { useFormik } from "formik";
import React, { useState } from "react";
import GoogleAuthButton from "../google_auth_button/google_auth_button";
import { authService } from "@/services";
import InputField from "../input_field/input_field";
import { useAppDispatch } from "@/store/store";
import { AuthActions } from "@/store/slices/auth_slice";
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
  const dispatch = useAppDispatch();
  const handleGoogleLogin = async () => {
    dispatch(AuthActions.startAuthenticating());
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
      dispatch(AuthActions.startAuthenticating());
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
          <InputField
            id="name"
            label="Name"
            placeholder="Enter your name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errorMessage={errors.name}
            touched={touched.name}
          />
        )}
        <InputField
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          errorMessage={errors.email}
          touched={touched.email}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          errorMessage={errors.password}
          touched={touched.password}
        />
        {isSigningup && (
          <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Enter the password again"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
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
