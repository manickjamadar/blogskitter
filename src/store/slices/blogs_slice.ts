import { IBlogModel } from "@/domain/models/blog";
import { blogService } from "@/services";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const sliceName = "blogs";
const fetchBlogs = createAsyncThunk<
  { blogs: IBlogModel[]; canFetchMore: boolean; isInitialFetching: boolean },
  { limit: number; skip: number; isInitialFetching?: boolean },
  { rejectValue: string }
>(
  `${sliceName}/fetchBlogs`,
  async ({ limit, skip, isInitialFetching = false }, { rejectWithValue }) => {
    const blogsOrError = await blogService.fetchBlogs(limit, skip);
    if (blogsOrError instanceof Error) {
      return rejectWithValue(blogsOrError.message);
    } else {
      return {
        blogs: blogsOrError,
        canFetchMore: blogsOrError.length === limit,
        isInitialFetching,
      };
    }
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
  reducers: {
    merge: (state, action: PayloadAction<IBlogModel>) => {
      const mergableBlog = action.payload;
      const newBlogs = state.values.filter((b) => b.id !== mergableBlog.id);
      state.values = [{ ...mergableBlog }, ...newBlogs];
    },
    remove: (state, action: PayloadAction<{ blogId: string }>) => {
      state.values = state.values.filter((b) => b.id !== action.payload.blogId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.state = "fetching";
      state.canFetchMore = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.errorMessage = "Blogs fetching failed";
      state.state = "error";
      state.errorMessage = action.payload;
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
