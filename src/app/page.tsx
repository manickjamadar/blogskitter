"use client";
import config from "@/domain/config";
import BlogsSelector from "@/store/selectors/blogs_selector";
import { BlogsActions } from "@/store/slices/blogs_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import BlogCardList from "@/views/blog_card_list/blog_card_list";
import BlogCardSkeletonList from "@/views/blog_card_skeleton_list/blog_card_skeleton_list";
import Container from "@/views/container/container";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      <Container>
        {blogs.length > 0 && (
          <BlogCardList
            blogs={blogs}
            onClick={(blog) => router.push("/blog/" + blog.id)}
          />
        )}
        {isBlogsFetching && (
          <BlogCardSkeletonList length={config.blog.fetchingLimit} />
        )}
        {canFetchMoreBlogs && (
          <div className="flex justify-center mb-8">
            <button
              className="roundedOutlineButton"
              onClick={handleFetchMoreBlogs}
            >
              Load More
            </button>
          </div>
        )}
        {isFetchedAll && (
          <p className="text-center p-6 text-2xl font-medium text-gray-200 animate-pulse">
            You have reached the end
          </p>
        )}
      </Container>
    </main>
  );
}
