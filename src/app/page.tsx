"use client";

import config from "@/domain/config";
import BlogsSelector from "@/store/selectors/blogs_selector";
import { BlogsActions } from "@/store/slices/blogs_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const isBlogsFetching = useAppSelector(BlogsSelector.isBlogsFetching);
  const canFetchMoreBlogs = useAppSelector(BlogsSelector.canFetchMoreBlogs);
  const isFetchedAll = useAppSelector(BlogsSelector.isFetchedAll);
  const isFetchingFailed = useAppSelector(BlogsSelector.isFetchingFailed);
  const fetchingErrorMessage = useAppSelector(
    BlogsSelector.fetchingErrorMessage
  );
  const handleFetchMoreBlogs = () => {
    dispatch(
      BlogsActions.fetchBlogs({
        limit: config.blog.fetchingLimit,
        skip: blogs.length,
        isInitialFetching: false,
      })
    );
  };
  const blogs = useAppSelector((state) => state.blogs.values);
  if (isFetchingFailed) {
    return (
      <p className="px-4 py-2 rounded border border-red-500 bg-red-50 text-red-400 text-center max-w-sm mx-auto mt-10">
        {fetchingErrorMessage
          ? fetchingErrorMessage
          : "Something went wrong, try again"}
      </p>
    );
  }
  return (
    <main>
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <div key={blog.id} className="border rounded p-2">
            <p className="font-bold">{blog.title}</p>
            <p>{blog.description}</p>
          </div>
        ))}
      {isBlogsFetching && <p className="text-2xl">Loading...</p>}
      {canFetchMoreBlogs && (
        <button className="primaryButton" onClick={handleFetchMoreBlogs}>
          Load More
        </button>
      )}
      {isFetchedAll && <p>You have reached the end</p>}
    </main>
  );
}
