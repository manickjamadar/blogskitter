import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import SideBlogCard from "../side_blog_card/side_blog_card";
interface Props {
  blogs: IBlogModel[];
}
const SideBlogCardList: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <SideBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default SideBlogCardList;
