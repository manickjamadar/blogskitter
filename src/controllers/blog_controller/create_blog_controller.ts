import ApiError from "@/domain/error/api_error";
import BlogPostBodySchema, {
  BlogPostBody,
} from "@/schemas/blog_post_body_schema";
import ApiErrorHandler from "../api_error_handler";
import { firebaseApiAuthService, firebaseApiBlogService } from "@/api_services";

const createBlogController = async (req: Request) => {
  try {
    //get the post data
    const blogPostBody = (await req.json()) as BlogPostBody;
    //validate data
    const validatedData = await BlogPostBodySchema.validate(blogPostBody);
    //get user id from token
    const authToken = req.headers.get("authorization");
    const token = authToken && authToken.split(" ")[1];
    const uidOrError = await firebaseApiAuthService.getUserId(token);
    if (uidOrError instanceof ApiError) {
      throw uidOrError;
    }
    //save the blog to firebase
    const blogOrError = await firebaseApiBlogService.createBlog(
      validatedData,
      uidOrError
    );
    if (blogOrError instanceof ApiError) {
      throw blogOrError;
    }
    //return full blog model
    return new Response(
      JSON.stringify({
        message: "Blog created successfully",
        blog: blogOrError,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return ApiErrorHandler(error, "Blog creation failed");
  }
};
export default createBlogController;
