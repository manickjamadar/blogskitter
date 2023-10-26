import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import BlogCard from "../blog_card/blog_card";
interface Props {
  blogs: IBlogModel[];
  onClick?: (blog: IBlogModel) => void;
  vertical?: boolean;
}
const BlogCardList: React.FC<Props> = ({
  blogs,
  onClick,
  vertical = false,
}) => {
  if (blogs.length < 1) {
    return null;
  }
  return (
    <div
      className={`flex ${
        vertical ? "flex-col" : "flex-row"
      } gap-6 flex-wrap box-border justify-center`}
    >
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onClick && onClick(blog)}
        />
      ))}
    </div>
  );
};

export default BlogCardList;
