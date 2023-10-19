import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must contain at least 3 character")
    .required("Name is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password can be maximum of 10 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Confirm Password is required"),
});
export default SignupSchema;
