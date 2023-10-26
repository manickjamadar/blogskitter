"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { useRouter } from "next/navigation";
import SideBlogCard from "../side_blog_card/side_blog_card";

const SideArticles = () => {
  const router = useRouter();
  const blogs = useAppSelector((state) => state.blogs.values).slice(0, 15);
  return (
    <div className="">
      <h3 className="text-xl text-center text-gray-700 font-medium mb-6">
        Related Articles
      </h3>
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <SideBlogCard
            key={blog.id}
            blog={blog}
            onClick={() => {
              router.push("/blog/" + blog.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SideArticles;
