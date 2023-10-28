import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import FullBlogCard from "../full_blog_card/full_blog_card";
interface Props {
  blogs: IBlogModel[];
}
const FullBlogCardList: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <FullBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default FullBlogCardList;
