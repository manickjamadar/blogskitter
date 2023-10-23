import { apiBlogService } from "@/api_services";
import { NextRequest, NextResponse } from "next/server";
import ApiErrorHandler from "../api_error_handler";
import ApiError from "@/domain/error/api_error";
import GetBlogsResponseBody from "@/domain/response_bodies/blog/get_blogs_response_body";

const getBlogsController = async (req: NextRequest) => {
  try {
    // get skip and limit param
    const url = new URL(req.url);
    const skip = Number(url.searchParams.get("skip")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 3;
    const blogsOrError = await apiBlogService.findBlogs(limit, skip);
    if (blogsOrError instanceof ApiError) {
      throw blogsOrError;
    }
    return NextResponse.json<GetBlogsResponseBody>({
      blogs: blogsOrError,
    });
  } catch (error) {
    return ApiErrorHandler(error, "Fetching blogs failed");
  }
};
export default getBlogsController;
