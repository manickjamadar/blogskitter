import CreateBlogResponseBody from "@/domain/response_bodies/blog/create_blog_response_body";
import IBlogService from "./i_blog_service";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";
import { IBlogModel } from "@/domain/models/blog";
import GetBlogsResponseBody from "@/domain/response_bodies/blog/get_blogs_response_body";

class FetchBlogService implements IBlogService {
  async fetchBlogs(limit: number, skip: number): Promise<IBlogModel[] | Error> {
    const defaultErrorMessage = "Fetching blogs failed";
    const blogsFetchUrl = `/api/blog?skip=${skip}&limit=${limit}`;
    try {
      const res = await fetch(blogsFetchUrl, { method: "GET" });
      if (!res.ok) {
        throw new Error(defaultErrorMessage);
      }
      const data = (await res.json()) as GetBlogsResponseBody;
      return data.blogs;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return new Error(defaultErrorMessage);
    }
  }
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
