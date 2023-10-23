import { RootState } from "../store";

class BlogsSelector {
  static isBlogsFetching = (state: RootState) =>
    state.blogs.state === "fetching";
  static canFetchMoreBlogs = (state: RootState) =>
    state.blogs.canFetchMore && state.blogs.state === "fetched";
}
export default BlogsSelector;
