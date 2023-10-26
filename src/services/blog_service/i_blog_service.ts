import { IBlogModel } from "@/domain/models/blog";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

abstract class IBlogService {
  abstract createBlog(blogData: BlogPostBody): Promise<IBlogModel | Error>;
  abstract fetchBlogs(
    limit: number,
    skip: number
  ): Promise<IBlogModel[] | Error>;
}
export default IBlogService;
