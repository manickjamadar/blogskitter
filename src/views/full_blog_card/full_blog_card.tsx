import { IBlogModel } from "@/domain/models/blog";
import formatDate from "@/utils/format_date";
import React from "react";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
  showDetails?: boolean;
}
const FullBlogCard: React.FC<Props> = ({
  blog,
  onClick,
  showDetails = false,
}) => {
  const { coverImageUrl, title, createdDate, description } = blog;
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded overflow-hidden w-full aspect-video bg-cover bg-center bg-no-repeat flex flex-col justify-end shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
      style={{ backgroundImage: `url('${coverImageUrl}')` }}
    >
      <div className="overflow-hidden rounded bg-gradient-to-b from-transparent to-black/60 text-white p-6 h-full w-full flex flex-col justify-end border">
        <div>
          <div
            className={`flex flex-col gap-1 ${showDetails ? "sm:mb-3" : ""}`}
          >
            <p className="capitalize text-lg font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </p>
            <p className="text-[12px] italic text-gray-300 font-medium">
              {formatDate(new Date(createdDate))}
            </p>
            {showDetails && (
              <p className="hidden sm:block text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {description}
              </p>
            )}
          </div>
          {showDetails && (
            <button className="hidden sm:block text-sm px-4 py-[6px] rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white">
              Continue Reading
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullBlogCard;
