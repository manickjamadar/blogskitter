import CreateBlogResponseBody from "@/domain/response_bodies/blog/create_blog_response_body";
import IBlogService from "./i_blog_service";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { IBlogModel } from "@/domain/models/blog";

class FetchBlogService implements IBlogService {
  async createBlog(
    blogData: BlogPostBody,
    token: string
  ): Promise<IBlogModel | Error> {
    const defaultErrorMessage = "Blog Creation failed";
    const blogPostUrl = "/api/blog";
    try {
      const res = await fetch(blogPostUrl, {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(defaultErrorMessage);
      }
      const data = (await res.json()) as CreateBlogResponseBody;
      return data.blog;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return new Error(defaultErrorMessage);
    }
  }
}
export default FetchBlogService;
