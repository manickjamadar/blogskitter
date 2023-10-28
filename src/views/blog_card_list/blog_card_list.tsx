import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import BlogCard from "../blog_card/blog_card";
interface Props {
  blogs: IBlogModel[];
  onClick?: (blog: IBlogModel) => void;
}
const BlogCardList: React.FC<Props> = ({ blogs, onClick }) => {
  if (blogs.length < 1) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
