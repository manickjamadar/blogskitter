import { IBlogModel } from "@/domain/models/blog";

interface GetBlogsResponseBody {
  blogs: IBlogModel[];
}
export default GetBlogsResponseBody;
