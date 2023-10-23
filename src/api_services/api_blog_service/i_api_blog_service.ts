import ApiError from "@/domain/error/api_error";
import BlogModel, { IBlogModel } from "@/domain/models/blog";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

abstract class IApiBlogService {
  abstract createBlog(
    blogData: BlogPostBody,
    userId: string
  ): Promise<IBlogModel | ApiError>;
  abstract findBlogs(
    limit: number,
    skip: number
  ): Promise<IBlogModel[] | ApiError>;
}
export default IApiBlogService;
