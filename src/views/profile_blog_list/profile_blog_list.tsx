import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import ProfileBlogCard from "../profile_blog_card/profile_blog_card";
interface Props {
  blogs: IBlogModel[];
}
const ProfileBlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="max-w-2xl p-5 mx-auto">
      {blogs.map((blog) => (
        <ProfileBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default ProfileBlogList;
