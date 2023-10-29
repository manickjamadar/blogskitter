import React from "react";
import BlogCardSkeleton from "../blog_card_skeleton/blog_card_skeleton";
interface Props {
  length: number;
}
const BlogCardSkeletonList: React.FC<Props> = ({ length }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length }, (_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogCardSkeletonList;
