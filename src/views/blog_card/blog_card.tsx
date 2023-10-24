"use client";
import config from "@/domain/config";
import { IBlogModel } from "@/domain/models/blog";
import formatDate from "@/utils/format_date";
import truncateString from "@/utils/truncate_string";
import Image from "next/image";
import React, { useState } from "react";
interface Props {
  blog: IBlogModel;
}
const BlogCard: React.FC<Props> = ({ blog }) => {
  const errorImageUrl = "/images/blog-cover-error-placeholder.png";
  const [coverImageUrl, setCoverImageUrl] = useState(
    blog.coverImageUrl ? blog.coverImageUrl : errorImageUrl
  );
  const placeholderDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/OXbHwAJmgPbgNt2+QAAAABJRU5ErkJggg==";
  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] max-w-xs shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="bg-gray-100 aspect-video w-full relative">
        <Image
          src={coverImageUrl}
          alt="blog cover placeholder image"
          fill
          className="object-cover"
          placeholder={placeholderDataUrl}
          onError={() => setCoverImageUrl(errorImageUrl)}
        />
      </div>
      <div className="flex-1 flex flex-col py-4 px-4 gap-2">
        <p className="text-xs border px-2 py-[2px] rounded-full text-orange-400 self-start">
          {formatDate(new Date(blog.createdDate))}
        </p>
        <h3 className="font-bold text-gray-600 capitalize">
          {truncateString(blog.title, config.blog.titleLimit)}
        </h3>
        <p className="text-sm text-gray-600 flex-1">
          {truncateString(blog.description, config.blog.descriptionLimit)}
        </p>
        <p className="text-xs font-medium text-blue-500 text-left">Read More</p>
      </div>
    </div>
  );
};

export default BlogCard;
