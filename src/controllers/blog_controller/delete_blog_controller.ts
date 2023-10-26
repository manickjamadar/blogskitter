import { apiAuthService, apiBlogService } from "@/api_services";
import { NextRequest, NextResponse } from "next/server";
import ApiErrorHandler from "../api_error_handler";
import ApiError from "@/domain/error/api_error";
import DeleteBlogResponseBody from "@/domain/response_bodies/delete_blog_response_body";

const deleteBlogController = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    //get the blog id
    const blogId = params.id;
    //get user id from token
    const authToken = req.headers.get("authorization");
    const token = authToken && authToken.split(" ")[1];
    const uidOrError = await apiAuthService.getUserId(token);
    if (uidOrError instanceof ApiError) {
      throw uidOrError;
    }
    //fetch the blog by id
    const blogOrError = await apiBlogService.getBlogById(blogId);
    if (blogOrError instanceof ApiError) {
      throw blogOrError;
    }
    //match user id with blog uid
    if (blogOrError.uid !== uidOrError) {
      throw new ApiError("User is unauthorized", 400);
    }
    //delete the blog from firebase
    await apiBlogService.deleteBlog(blogId);
    //return deleted blog
    return NextResponse.json<DeleteBlogResponseBody>({
      blog: blogOrError,
    });
  } catch (error) {
    return ApiErrorHandler(error, "Blog deletion failed");
  }
};
export default deleteBlogController;
