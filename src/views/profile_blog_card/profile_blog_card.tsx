import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import formatDate from "@/utils/format_date";
import RawImage from "../raw_image/raw_image";
import { MdEdit, MdDelete } from "react-icons/md";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
}
const ProfileBlogCard: React.FC<Props> = ({
  blog,
  onClick,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <div className="shadow-sm hover:shadow-md hover:shadow-gray-200 hover:-translate-y-1  transition-all rounded p-4 flex gap-4 overflow-hidden text-ellipsis items-center">
      <div
        className="w-20 min-w-[5rem] self-stretch bg-gray-100 rounded overflow-hidden relative cursor-pointer"
        onClick={onClick}
      >
        <RawImage
          src={blog.coverImageUrl}
          errorSrc="/images/blog-cover-error-placeholder.png"
          alt="blog cover image"
        />
      </div>
      <div
        className="flex-1 overflow-hidden text-ellipsis cursor-pointer"
        onClick={onClick}
      >
        <h3 className="capitalize font-bold text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
          {blog.title}
        </h3>
        <p className="text-xs italic text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
          created at {formatDate(new Date(blog.createdDate))}
        </p>
        <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
          {blog.description}
        </p>
      </div>
      <button
        className="text-lg text-blue-500 hover:text-blue-800 hover:transition-colors"
        onClick={onEditClick}
      >
        <MdEdit />
      </button>
      <button
        className="text-lg text-red-500 hover:text-red-800 hover:transition-colors"
        onClick={onDeleteClick}
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default ProfileBlogCard;
