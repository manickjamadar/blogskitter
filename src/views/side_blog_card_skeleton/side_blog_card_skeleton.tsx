import React from "react";

const SideBlogCardSkeleton = () => {
  return (
    <div className="rounded overflow-hidden flex">
      <div className="bg-gray-100 relative flex-1 aspect-video animate-pulse"></div>
      <div className="flex-[2] px-4 py-1 min-w-0 flex flex-col gap-2">
        <p className="text-[12px] text-gray-400 italic w-1/2 h-3 bg-gray-100 rounded animate-pulse"></p>
        <p className="text-sm font-medium w-10/12 h-4 bg-gray-100 rounded animate-pulse"></p>
        <p className="text-[12px] w-12 h-2 bg-gray-100 rounded animate-pulse"></p>
      </div>
    </div>
  );
};

export default SideBlogCardSkeleton;
