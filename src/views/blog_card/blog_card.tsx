"use client";
import config from "@/domain/config";
import { IBlogModel } from "@/domain/models/blog";
import formatDate from "@/utils/format_date";
import truncateString from "@/utils/truncate_string";
import React, { useState } from "react";
import CustomImage from "../custom_image/custom_image";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
}
const BlogCard: React.FC<Props> = ({ blog, onClick }) => {
  const errorImageUrl = "/images/blog-cover-error-placeholder.png";
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col rounded-lg overflow-hidden w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] max-w-xs shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 transition-all "
    >
      <CustomImage
        src={blog.coverImageUrl}
        alt="Blog Cover Image"
        errorSrc={errorImageUrl}
      />
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
