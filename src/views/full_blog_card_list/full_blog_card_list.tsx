import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import FullBlogCard from "../full_blog_card/full_blog_card";
interface Props {
  blogs: IBlogModel[];
  onClick?: (blog: IBlogModel) => void;
}
const FullBlogCardList: React.FC<Props> = ({ blogs, onClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <FullBlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onClick && onClick(blog)}
        />
      ))}
    </div>
  );
};

export default FullBlogCardList;
