import * as Yup from "yup";
const BlogPostBodySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "At least one category is required")
    .required("Categories is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 character long")
    .required("Description is required"),
  coverImageUrl: Yup.string()
    .url("Invalid image url")
    .required("Cover Image is required"),
});
export type BlogPostBody = Yup.InferType<typeof BlogPostBodySchema>;

export default BlogPostBodySchema;
