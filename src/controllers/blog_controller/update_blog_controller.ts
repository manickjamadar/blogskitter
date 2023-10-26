import BlogPostBodySchema, {
  BlogPostBody,
} from "@/schemas/blog_post_body_schema";
import { NextRequest, NextResponse } from "next/server";
import ApiErrorHandler from "../api_error_handler";
import { apiAuthService, apiBlogService } from "@/api_services";
import ApiError from "@/domain/error/api_error";
import UpdateBlogResponseBody from "@/domain/response_bodies/blog/update_blog_response_body";

const updateBlogController = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const blogId = params.id;
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
    //update the blog to firebase
    const blogOrError = await apiBlogService.updateBlog({
      blogData: validatedData,
      blogId,
    });
    if (blogOrError instanceof ApiError) {
      throw blogOrError;
    }
    return NextResponse.json<UpdateBlogResponseBody>(
      {
        blog: blogOrError,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return ApiErrorHandler(error, "Blog updating failed");
  }
};
export default updateBlogController;
