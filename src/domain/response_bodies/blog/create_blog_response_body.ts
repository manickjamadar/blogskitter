import { IBlogModel } from "@/domain/models/blog";

interface CreateBlogResponseBody {
  message: string;
  blog: IBlogModel;
}
export default CreateBlogResponseBody;
