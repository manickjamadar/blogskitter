"use client";
import _ from "lodash";
import { IBlogModel } from "@/domain/models/blog";
import useAuth from "@/hooks/use_auth";
import BlogFormBodySchema from "@/schemas/blog_form_body_schema";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { blogService, storageService } from "@/services";
import validateImage from "@/utils/validateImage";
import ImageUploadField from "@/views/image_upload_field/image_upload_field";
import InputField from "@/views/input_field/input_field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface BlogFormData {
  title: string;
  description: string;
}
interface Props {
  editableBlog?: IBlogModel;
}
const BlogForm: React.FC<Props> = ({ editableBlog }) => {
  const isEditMode = !!editableBlog;
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues: BlogFormData = {
    title: editableBlog?.title || "",
    description: editableBlog?.description || "",
  };
  const router = useRouter();
  const { user } = useAuth();
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files && event.target.files[0];
    if (isEditMode && !image) {
      setUploadImage(null);
      setImageErrorMessage("");
      return;
    }
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
      let coverImageUrl = editableBlog?.coverImageUrl;
      try {
        if (uploadImage) {
          const imageUrlOrError = await storageService.getCoverImageUrl(
            uploadImage
          );
          if (imageUrlOrError instanceof Error) {
            throw imageUrlOrError;
          }
          coverImageUrl = imageUrlOrError;
        }
        if (!coverImageUrl) {
          setImageErrorMessage("Image is required");
          setSubmitting(false);
          return;
        }
        const blogData: BlogPostBody = {
          title: values.title,
          description: values.description,
          categories: ["coding"],
          coverImageUrl: coverImageUrl,
        };
        if (isEditMode) {
          //TODO: have to check whether the blog data changes
          const oldBlogData: BlogPostBody = {
            title: editableBlog.title,
            description: editableBlog.description,
            categories: [...editableBlog.categories],
            coverImageUrl: editableBlog.coverImageUrl,
          };
          if (!_.isEqual(blogData, oldBlogData)) {
            const blogOrError = await blogService.updateBlog({
              blogData,
              blogId: editableBlog.id,
            });
            if (blogOrError instanceof Error) {
              throw blogOrError;
            }
          }
        } else {
          const blogOrError = await blogService.createBlog(blogData);
          if (blogOrError instanceof Error) {
            throw blogOrError;
          }
        }
        resetForm();
        setErrorMessage("");
        setImageErrorMessage("");
        if (user) {
          router.replace(`/profile/${user.id}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        setErrorMessage(errorMessage);
        setSubmitting(false);
      }
    },
  });
  const previewImageUrl =
    uploadImage instanceof File
      ? URL.createObjectURL(uploadImage)
      : editableBlog?.coverImageUrl;
  return (
    <div className="w-10/12 max-w-lg mx-auto mt-5 rounded p-5">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center mb-2">
        {isEditMode ? "Edit Blog" : "Create Blog"}
      </h2>
      <p className="text-sm sm:text-base text-center text-gray-500 mb-6">
        {isEditMode
          ? "The World wants to see something different"
          : "The world is waiting for something new today"}
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
          imageUrl={previewImageUrl}
          onChange={handleUploadImage}
          errorMessage={imageErrorMessage}
        />
        <div className="flex gap-4">
          <button
            className="outlineButton flex-1"
            disabled={isSubmitting}
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </button>
          <button
            className="primaryButton flex-1"
            disabled={isSubmitting}
            type="submit"
          >
            {isEditMode ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
