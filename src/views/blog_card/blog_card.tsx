"use client";
import config from "@/domain/config";
import { IBlogModel } from "@/domain/models/blog";
import formatDate from "@/utils/format_date";
import truncateString from "@/utils/truncate_string";
import React, { useState } from "react";
import RawImage from "../raw_image/raw_image";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
}
const BlogCard: React.FC<Props> = ({ blog, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer rounded overflow-hidden flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div className="relative w-full aspect-video bg-gray-100">
        <RawImage
          src={blog.coverImageUrl}
          errorSrc={config.images.blogCoverPlaceholderUrl}
          alt="Blog Cover Image"
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
        <p className="text-xs font-medium text-blue-500 text-left cursor-pointer">
          Read More
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
