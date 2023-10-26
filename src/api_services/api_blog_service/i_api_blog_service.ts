import ApiError from "@/domain/error/api_error";
import { IBlogModel } from "@/domain/models/blog";
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
  abstract getBlogById(id: string): Promise<IBlogModel | ApiError>;
  abstract getBlogsByUserId(userId: string): Promise<IBlogModel[] | ApiError>;
  abstract deleteBlog(id: string): Promise<void | ApiError>;
}
export default IApiBlogService;
