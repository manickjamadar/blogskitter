import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import SideBlogCard from "../side_blog_card/side_blog_card";
interface Props {
  blogs: IBlogModel[];
  onClick?: (blog: IBlogModel) => void;
}
const SideBlogCardList: React.FC<Props> = ({ blogs, onClick }) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <SideBlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onClick && onClick(blog)}
        />
      ))}
    </div>
  );
};

export default SideBlogCardList;
