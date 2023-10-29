import { RootState } from "../store";

class BlogsSelector {
  static isBlogsFetching = (state: RootState) =>
    state.blogs.state === "fetching" || state.blogs.state === "idle";
  static canFetchMoreBlogs = (state: RootState) =>
    state.blogs.canFetchMore && state.blogs.state === "fetched";
  static isFetchedAll = (state: RootState) => !state.blogs.canFetchMore;
  static isFetchingFailed = (state: RootState) => state.blogs.state === "error";
  static fetchingErrorMessage = (state: RootState) => state.blogs.errorMessage;
}
export default BlogsSelector;
