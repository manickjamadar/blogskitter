import React from "react";
import BlogCardSkeleton from "../blog_card_skeleton/blog_card_skeleton";
interface Props {
  length: number;
}
const BlogCardSkeletonList: React.FC<Props> = ({ length }) => {
  return (
    <div className="flex p-10 gap-6 flex-wrap box-border justify-center">
      {Array.from({ length }, (_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogCardSkeletonList;
