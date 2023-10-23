import { getDemoBlogData } from "@/domain/data/demo_blog_data";
import { IBlogModel } from "@/domain/models/blog";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const sliceName = "blogs";
const fetchBlogs = createAsyncThunk<
  { blogs: IBlogModel[]; canFetchMore: boolean; isInitialFetching: boolean },
  { limit: number; skip: number; isInitialFetching?: boolean }
>(
  `${sliceName}/fetchBlogs`,
  async ({ limit, skip, isInitialFetching = false }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const blogs = getDemoBlogData(limit, skip);
        resolve({
          blogs,
          canFetchMore: blogs.length === limit,
          isInitialFetching,
        });
      }, 3000);
    });
  }
);
interface BlogsState {
  values: IBlogModel[];
  state: "idle" | "fetching" | "fetched" | "error";
  errorMessage?: string;
  canFetchMore: boolean;
}

const initialState: BlogsState = {
  values: [],
  state: "idle",
  canFetchMore: true,
};
const blogsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.state = "fetching";
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.errorMessage = "Blogs fetching failed";
      state.state = "error";
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.errorMessage = "";
      if (action.payload.isInitialFetching) {
        state.values = [...action.payload.blogs];
      } else {
        state.values = [...state.values, ...action.payload.blogs];
      }
      state.state = "fetched";
      state.canFetchMore = action.payload.canFetchMore;
    });
  },
});

export const BlogsActions = { ...blogsSlice.actions, fetchBlogs };
export const BlogsReducer = blogsSlice.reducer;
export default blogsSlice;
