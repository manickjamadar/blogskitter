import { apiBlogService } from "@/api_services";
import Image from "next/image";
import ApiError from "@/domain/error/api_error";
import React from "react";
import formatDate from "@/utils/format_date";
const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blogId = params.id;
  const blogOrError = await apiBlogService.getBlogById(blogId);
  if (blogOrError instanceof ApiError) {
    return <p>{blogOrError.message}</p>;
  }
  const { coverImageUrl, createdDate, description, title } = blogOrError;
  return (
    <div className="p-10 max-w-xl mx-auto">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
        <Image
          src={coverImageUrl}
          fill
          alt={`${title} cover image`}
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400 italic text-sm mb-4">
        Created at {formatDate(new Date(createdDate))}
      </p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BlogPage;
