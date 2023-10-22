import ApiError from "@/domain/error/api_error";
import BlogPostBodySchema, {
  BlogPostBody,
} from "@/schemas/blog_post_body_schema";
import ApiErrorHandler from "../api_error_handler";
import { apiAuthService, apiBlogService } from "@/api_services";
import { NextRequest, NextResponse } from "next/server";
import { IBlogModel } from "@/domain/models/blog";
import CreateBlogResponseBody from "@/domain/response_bodies/blog/create_blog_response_body";

const createBlogController = async (req: NextRequest) => {
  try {
    //get the post data
    const blogPostBody = (await req.json()) as BlogPostBody;
    //validate data
    const validatedData = await BlogPostBodySchema.validate(blogPostBody);
    //get user id from token
    const authToken = req.headers.get("authorization");
    const token = authToken && authToken.split(" ")[1];
    const uidOrError = await apiAuthService.getUserId(token);
    if (uidOrError instanceof ApiError) {
      throw uidOrError;
    }
    //save the blog to firebase
    const blogOrError = await apiBlogService.createBlog(
      validatedData,
      uidOrError
    );
    if (blogOrError instanceof ApiError) {
      throw blogOrError;
    }
    return NextResponse.json<CreateBlogResponseBody>(
      {
        message: "Blog created successfully 2",
        blog: blogOrError,
      },
      { status: 201 }
    );
  } catch (error) {
    return ApiErrorHandler(error, "Blog creation failed");
  }
};
export default createBlogController;
