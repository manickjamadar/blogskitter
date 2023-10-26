"use client";
import AuthError from "@/domain/error/auth_error";
import useAuth from "@/hooks/use_auth";
import BlogFormBodySchema from "@/schemas/blog_form_body_schema";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { authService, blogService, storageService } from "@/services";
import validateImage from "@/utils/validateImage";
import ImageUploadField from "@/views/image_upload_field/image_upload_field";
import InputField from "@/views/input_field/input_field";
import ProtectedPage from "@/views/protected_page/protected_page";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface BlogFormData {
  title: string;
  description: string;
}
const CreateBlogPage = () => {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues: BlogFormData = {
    title: "",
    description: "",
  };
  const router = useRouter();
  const { user } = useAuth();
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files && event.target.files[0];
    const defaultErrorMessage = "Image is required";
    const imageErrorMessage = image
      ? validateImage(image)
      : defaultErrorMessage;
    if (imageErrorMessage) {
      setImageErrorMessage(imageErrorMessage);
      setUploadImage(null);
      return;
    }
    if (image) {
      setUploadImage(image);
      setImageErrorMessage("");
    }
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
    validationSchema: BlogFormBodySchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!uploadImage) {
        setImageErrorMessage("Cover Image is required");
        return;
      }
      let error: Error | undefined;
      const imageUrlOrError = await storageService.getCoverImageUrl(
        uploadImage
      );
      if (imageUrlOrError instanceof Error) {
        error = imageUrlOrError;
      } else {
        const blogData: BlogPostBody = {
          title: values.title,
          description: values.description,
          categories: ["coding"],
          coverImageUrl: imageUrlOrError,
        };
        const blogOrError = await blogService.createBlog(blogData);
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
        setImageErrorMessage("");
        // router.push("/");
        if (user) {
          router.push(`/profile/${user.id}`);
        }
      }
    },
  });
  return (
    <ProtectedPage>
      <div className="w-10/12 max-w-lg mx-auto mt-5 rounded p-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center mb-2">
          Create Blog
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-500 mb-6">
          The world is waiting for something new today
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <ImageUploadField
            id="coverImage"
            image={uploadImage}
            onChange={handleUploadImage}
            errorMessage={imageErrorMessage}
          />
          <div className="flex gap-4">
            <button
              className="outlineButton flex-1"
              disabled={isSubmitting}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className="primaryButton flex-1"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </ProtectedPage>
  );
};

export default CreateBlogPage;
