"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import BlogCardList from "../blog_card_list/blog_card_list";
import { useRouter } from "next/navigation";
import Container from "../container/container";

const LatestArticles = () => {
  const router = useRouter();
  const blogs = useAppSelector((state) => state.blogs.values).slice(0, 12);
  return (
    <div>
      <h3 className="text-2xl text-center text-gray-700 font-medium mb-6">
        Latest Articles
      </h3>
      <BlogCardList
        blogs={blogs}
        onClick={(blog) => {
          router.push("/blog/" + blog.id);
        }}
      />
    </div>
  );
};

export default LatestArticles;
