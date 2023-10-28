"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { useRouter } from "next/navigation";
import SideBlogCard from "../side_blog_card/side_blog_card";
import { getDemoBlogData } from "@/domain/data/demo_blog_data";
import FullBlogCard from "../full_blog_card/full_blog_card";
import BlogCard from "../blog_card/blog_card";

const SideArticles = () => {
  const router = useRouter();
  const blogs = useAppSelector((state) => state.blogs.values).slice(0, 5);
  const relatedArticles = blogs.slice(0, 5);
  return (
    <div className="">
      <h3 className="text-xl text-center text-gray-700 font-medium mb-4">
        Related Articles
      </h3>

      {relatedArticles.length > 0 ? (
        <div className="flex flex-col gap-4">
          {relatedArticles.map((blog) => (
            <SideBlogCard
              key={blog.id}
              blog={blog}
              onClick={() => {
                router.push("/blog/" + blog.id);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No Articles</p>
      )}
    </div>
  );
};

export default SideArticles;
