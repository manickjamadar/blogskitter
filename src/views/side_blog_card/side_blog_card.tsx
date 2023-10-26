import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import RawImage from "../raw_image/raw_image";
import config from "@/domain/config";
import truncateString from "@/utils/truncate_string";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
}
const SideBlogCard: React.FC<Props> = ({ blog, onClick }) => {
  return (
    <div
      className="rounded cursor-pointer flex overflow-hidden shadow-md"
      onClick={onClick}
    >
      <div className="bg-gray-100 flex-1 self-stretch relative overflow-hidden">
        <RawImage
          alt="side bar cover image"
          src={blog.coverImageUrl}
          errorSrc={config.images.blogCoverPlaceholderUrl}
        />
      </div>
      <div className="flex-[2] p-4">
        <p className="text-sm">{truncateString(blog.title, 46)}</p>
      </div>
    </div>
  );
};

export default SideBlogCard;
