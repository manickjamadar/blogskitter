import createBlogController from "./create_blog_controller";
import getBlogsController from "./get_blogs_controller";
const BlogController = {
  createBlog: createBlogController,
  getBlogs: getBlogsController,
};
export default BlogController;
