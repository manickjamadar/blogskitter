"use client";
import AuthError from "@/domain/error/auth_error";
import BlogFormBodySchema from "@/schemas/blog_form_body_schema";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { authService, blogService } from "@/services";
import InputField from "@/views/input_field/input_field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface BlogFormData {
  title: string;
  description: string;
}
const CreateBlogPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues: BlogFormData = {
    title: "",
    description: "",
  };
  const router = useRouter();
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
    validationSchema: BlogFormBodySchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      let error: Error | undefined;
      //get user id token
      const tokenOrError = await authService.getUserToken();
      if (tokenOrError instanceof AuthError) {
        error = tokenOrError;
      } else {
        const blogData: BlogPostBody = {
          title: values.title,
          description: values.description,
          categories: ["Category 1", "Category 2"],
          coverImageUrl: "https://image.google.com/image",
        };
        const blogOrError = await blogService.createBlog(
          blogData,
          tokenOrError
        );
        if (blogOrError instanceof Error) {
          error = blogOrError;
        }
      }
      if (error) {
        setErrorMessage(error.message);
        setSubmitting(false);
      } else {
        resetForm();
        setErrorMessage("");
        router.push("/");
      }
    },
  });
  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p className="bg-red-400 text-white rounded text-sm px-4 py-2">
            {errorMessage}
          </p>
        )}
        <InputField
          id="title"
          placeholder="Write down the blog title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          errorMessage={errors.title}
          touched={touched.title}
          label="Title"
        />
        <InputField
          id="description"
          placeholder="Enter blog description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          errorMessage={errors.description}
          touched={touched.description}
          label="Description"
        />
        <button className="outlineButton">Cancel</button>
        <button className="primaryButton" disabled={isSubmitting} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
