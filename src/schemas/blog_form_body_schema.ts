import * as Yup from "yup";
const BlogFormBodySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 character long")
    .required("Description is required"),
});
export default BlogFormBodySchema;
