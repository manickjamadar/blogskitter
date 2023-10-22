import { IBlogModel } from "@/domain/models/blog";
import CreateBlogResponseBody from "@/domain/response_bodies/blog/create_blog_response_body";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

abstract class IBlogService {
  abstract createBlog(
    blogData: BlogPostBody,
    token: string
  ): Promise<IBlogModel | Error>;
}
export default IBlogService;
