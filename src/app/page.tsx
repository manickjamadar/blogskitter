"use client";
import config from "@/domain/config";
import { getDemoBlogData } from "@/domain/data/demo_blog_data";
import BlogsSelector from "@/store/selectors/blogs_selector";
import { BlogsActions } from "@/store/slices/blogs_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import formatDate from "@/utils/format_date";
import truncateString from "@/utils/truncate_string";
import BlogCardList from "@/views/blog_card_list/blog_card_list";
import BlogCardSkeletonList from "@/views/blog_card_skeleton_list/blog_card_skeleton_list";
import Container from "@/views/container/container";
import Hero from "@/views/hero/hero";
import FullBlogCard from "@/views/full_blog_card/full_blog_card";
import { useRouter } from "next/navigation";
import FullBlogCardList from "@/views/full_blog_card_list/full_blog_card_list";
import SideBlogCardList from "@/views/side_blog_card_list/side_blog_card_list";
import { IBlogModel } from "@/domain/models/blog";

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
  const handleBlogClick = (blog: IBlogModel) => {
    router.push(`/blog/${blog.id}`);
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
  // const demoBlogs = getDemoBlogData(12, 0);
  const topBlog = blogs[0];
  const sideBlogs = blogs.slice(-5);
  const featuredArticles = blogs.slice(1, 7);
  const latestArticles = blogs.slice(7);
  return (
    <Container>
      <Hero />
      <div className="flex gap-6">
        {topBlog && sideBlogs.length < 1 && (
          <FullBlogCard
            blog={topBlog}
            showDetails
            onClick={() => handleBlogClick(topBlog)}
          />
        )}
        {topBlog && sideBlogs.length > 0 && (
          <>
            <div className="blog-gray-100 w-full lg:w-2/3">
              <FullBlogCard
                blog={topBlog}
                showDetails
                onClick={() => handleBlogClick(topBlog)}
              />
            </div>
            <div className="hidden lg:block blog-gray-100 w-1/3">
              <SideBlogCardList blogs={sideBlogs} onClick={handleBlogClick} />
            </div>
          </>
        )}
      </div>
      {featuredArticles.length > 0 && (
        <div className="py-8 border-b">
          <h2 className="font-medium text-2xl text-center sm:text-left mb-6">
            Featured Articles
          </h2>
          <FullBlogCardList
            blogs={featuredArticles}
            onClick={handleBlogClick}
          />
        </div>
      )}
      {latestArticles.length > 0 && (
        <div className="py-8" id="latest-articles">
          <h2 className="font-medium text-2xl text-center sm:text-left mb-6">
            Latest Articles
          </h2>
          <BlogCardList blogs={latestArticles} onClick={handleBlogClick} />
        </div>
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
  );
}
