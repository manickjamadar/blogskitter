import UserModel from "@/domain/models/user";
import SigninSchema from "@/schemas/signin_schema";
import SignupSchema from "@/schemas/signup_schema";
import { useFormik } from "formik";
import React from "react";
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
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const id = Math.random().toString();
      const user: UserModel = {
        id,
        email: values.email,
        name: values.name || "Annonymous",
      };
      onSubmit && onSubmit(user);
      setSubmitting(false);
      resetForm();
    },
  });
  return (
    <div className="p-10">
      <h1 className="text-center text-xl">BlogSkitter</h1>
      <p className="text-center mb-4 mt-2 text-sm">
        {isSigningup ? "Create your account" : "Sign In to your account"}
      </p>
      <form className="mb-4" onSubmit={handleSubmit}>
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
      <p className="text-center text-sm">
        {isSigningup ? "Already" : "Don't"} have an account?{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={() =>
            isSigningup
              ? onSigninClick && onSigninClick()
              : onSignupClick && onSignupClick()
          }
        >
          {isSigningup ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
