import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import RawImage from "../raw_image/raw_image";
import config from "@/domain/config";
import truncateString from "@/utils/truncate_string";
import formatDate from "@/utils/format_date";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
}
const SideBlogCard: React.FC<Props> = ({ blog, onClick }) => {
  return (
    <div
      className="rounded cursor-pointer overflow-hidden flex shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
      onClick={onClick}
    >
      <div className="bg-gray-100 relative flex-1 aspect-video">
        <RawImage
          alt="side bar cover image"
          src={blog.coverImageUrl}
          errorSrc={config.images.blogCoverPlaceholderUrl}
        />
      </div>
      <div className="flex-[2] px-4 py-1 min-w-0">
        <p className="text-[12px] text-gray-400 italic">
          {formatDate(new Date(blog.createdDate))}
        </p>
        <p className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap capitalize">
          {blog.title}
        </p>
        <p className="text-[12px] text-blue-500 hover:text-blue-600 transition-colors">
          Read
        </p>
      </div>
    </div>
  );
};

export default SideBlogCard;
