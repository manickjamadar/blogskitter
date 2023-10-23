"use client";
import AuthError from "@/domain/error/auth_error";
import BlogFormBodySchema from "@/schemas/blog_form_body_schema";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { authService, blogService, storageService } from "@/services";
import validateImage from "@/utils/validateImage";
import InputField from "@/views/input_field/input_field";
import ProtectedPage from "@/views/protected_page/protected_page";
import { useFormik } from "formik";
import Image from "next/image";
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
      //get user id token
      const tokenOrError = await authService.getUserToken();
      if (tokenOrError instanceof AuthError) {
        error = tokenOrError;
      } else {
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
          const blogOrError = await blogService.createBlog(
            blogData,
            tokenOrError
          );
          if (blogOrError instanceof Error) {
            error = blogOrError;
          }
        }
      }
      if (error) {
        setErrorMessage(error.message);
        setSubmitting(false);
      } else {
        resetForm();
        setErrorMessage("");
        setImageErrorMessage("");
        router.push("/");
      }
    },
  });
  return (
    <ProtectedPage>
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
          <div>
            {uploadImage && (
              <Image
                src={URL.createObjectURL(uploadImage)}
                width={100}
                height={100}
                alt="Cover Image"
              />
            )}
            {uploadImage && (
              <p className="text-green-500">{uploadImage.name}</p>
            )}
            <label htmlFor="coverImage" className="primaryButton">
              Add Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              className="hidden"
              accept="image/*"
              onChange={handleUploadImage}
            />
            {imageErrorMessage && (
              <p className="inputErrorMessage mt-1 mb-1">{imageErrorMessage}</p>
            )}
          </div>
          <button className="outlineButton" disabled={isSubmitting}>
            Cancel
          </button>
          <button
            className="primaryButton"
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </ProtectedPage>
  );
};

export default CreateBlogPage;
