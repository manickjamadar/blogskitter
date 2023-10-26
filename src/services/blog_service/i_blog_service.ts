import { IBlogModel } from "@/domain/models/blog";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

abstract class IBlogService {
  abstract createBlog(blogData: BlogPostBody): Promise<IBlogModel | Error>;
  abstract fetchBlogs(
    limit: number,
    skip: number
  ): Promise<IBlogModel[] | Error>;
  abstract deleteBlog(id: string): Promise<IBlogModel | Error>;
  abstract updateBlog(data: {
    blogData: BlogPostBody;
    blogId: string;
  }): Promise<IBlogModel | Error>;
}
export default IBlogService;
