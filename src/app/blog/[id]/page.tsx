import { apiBlogService } from "@/api_services";
import ApiError from "@/domain/error/api_error";
import React from "react";
import formatDate from "@/utils/format_date";
import CustomImage from "@/views/custom_image/custom_image";
import Link from "next/link";
import DemoBlogContent from "@/views/demo_blog_content/demo_blog_content";
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
  const { coverImageUrl, createdDate, description, title } = blogOrError;
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="rounded-lg overflow-hidden mb-4">
        <CustomImage
          src={coverImageUrl}
          alt="Blog Image"
          errorSrc="/images/blog-cover-error-placeholder.png"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2 capitalize">{title}</h1>
      <p className="text-gray-400 italic text-sm mb-4">
        Created at {formatDate(new Date(createdDate))}
      </p>
      <p className="text-gray-600">{description}</p>
      <DemoBlogContent />
    </div>
  );
};

export default BlogPage;
