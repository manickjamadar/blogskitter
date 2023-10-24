import formatDate from "@/utils/format_date";
import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] max-w-xs shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="bg-gray-100 aspect-video w-full relative"></div>
      <div className="flex-1 flex flex-col py-4 px-4 gap-2 animate-pulse">
        <p className="text-xs px-2 py-[2px] rounded self-start w-1/5 h-2 bg-orange-100"></p>
        <h3 className="font-bold text-gray-600 capitalize w-1/3 h-4 bg-gray-200 rounded"></h3>
        <p className="text-sm text-gray-600 w-10/12 h-3 bg-gray-100 rounded"></p>
        <p className="text-sm text-gray-600 w-9/12 h-3 bg-gray-100 rounded"></p>
        <p className="text-xs font-medium  text-left w-1/5 h-2 bg-blue-100"></p>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
