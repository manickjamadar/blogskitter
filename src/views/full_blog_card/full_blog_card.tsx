import { IBlogModel } from "@/domain/models/blog";
import formatDate from "@/utils/format_date";
import React from "react";
interface Props {
  blog: IBlogModel;
  onClick?: () => void;
}
const FullBlogCard: React.FC<Props> = ({ blog, onClick }) => {
  const { coverImageUrl, title, createdDate, description } = blog;
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded overflow-hidden w-full aspect-video bg-cover bg-center bg-no-repeat flex flex-col justify-end shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
      style={{ backgroundImage: `url('${coverImageUrl}')` }}
    >
      <div className="bg-gradient-to-b from-transparent to-black/60 text-white p-6 h-full self-stretch flex items-end">
        <div>
          <div className="flex flex-col gap-1">
            <p className="capitalize text-lg font-medium">{title}</p>
            <p className="text-[12px] italic text-gray-300 font-medium">
              {formatDate(new Date(createdDate))}
            </p>
            {/* <p className="text-sm">{description}</p> */}
          </div>
          {/* <button className="text-sm px-4 py-[6px] rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white">
            Continue Reading
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FullBlogCard;
