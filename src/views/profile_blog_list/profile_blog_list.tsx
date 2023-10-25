"use client";
import { IBlogModel } from "@/domain/models/blog";
import React, { useState } from "react";
import ProfileBlogCard from "../profile_blog_card/profile_blog_card";
interface Props {
  blogs: IBlogModel[];
}
const deleteBlog = (id: string): Promise<string | Error> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Error("asd"));
    }, 3000);
  });
};
const ProfileBlogList: React.FC<Props> = ({ blogs }) => {
  const [blogList, setBlogList] = useState(blogs);
  const handleDelete = async (blog: IBlogModel) => {
    let deletableBlogIndex = -1;
    let deletableBlog: IBlogModel | undefined;
    setBlogList((oldBlogList) => {
      deletableBlogIndex = oldBlogList.findIndex((b) => b.id === blog.id);
      deletableBlog = oldBlogList.find((b) => b.id === blog.id);
      return oldBlogList.filter((b) => b.id !== blog.id);
    });
    const result = await deleteBlog(blog.id);
    if (result instanceof Error) {
      setBlogList((oldBlogList) => {
        const newBlogList = [...oldBlogList];
        if (deletableBlog && deletableBlogIndex >= 0) {
          newBlogList.splice(deletableBlogIndex, 0, deletableBlog);
        }
        return newBlogList;
      });
    }
  };
  return (
    <div className="max-w-2xl p-5 mx-auto">
      {blogList.map((blog) => (
        <ProfileBlogCard
          key={blog.id}
          blog={blog}
          onDeleteClick={() => handleDelete(blog)}
        />
      ))}
    </div>
  );
};

export default ProfileBlogList;
