import createBlogController from "./create_blog_controller";
import deleteBlogController from "./delete_blog_controller";
import getBlogsController from "./get_blogs_controller";
import updateBlogController from "./update_blog_controller";
const BlogController = {
  createBlog: createBlogController,
  getBlogs: getBlogsController,
  deteleBlog: deleteBlogController,
  updateBlog: updateBlogController,
};
export default BlogController;
