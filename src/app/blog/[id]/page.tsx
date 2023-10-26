import { apiBlogService } from "@/api_services";
import ApiError from "@/domain/error/api_error";
import React from "react";
import Link from "next/link";
import LatestArticles from "@/views/latest_articles/latest_article";
import MainArticle from "@/views/main_article/main_article";
const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blogId = params.id;
  const blogOrError = await apiBlogService.getBlogById(blogId);
  if (blogOrError instanceof ApiError) {
    return (
      <div>
        <p className="text-xl text-center p-10 text-gray-600">
          {blogOrError.message}
        </p>
        <div className="flex justify-center items-center">
          <Link href="/" className="mx-auto primaryButton">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MainArticle blog={blogOrError} />
      <LatestArticles />
    </div>
  );
};

export default BlogPage;
