import React from "react";
import SideBlogCardSkeleton from "../side_blog_card_skeleton/side_blog_card_skeleton";

const HeroBlogSkeleton = () => {
  return (
    <div className="flex gap-6">
      <div className="blog-gray-100 w-full lg:w-2/3 animate-pulse">
        <div className="bg-gray-100 rounded w-full aspect-video"></div>
      </div>
      <div className="hidden lg:block blog-gray-100 w-1/3">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }, (_, index) => (
            <SideBlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBlogSkeleton;
