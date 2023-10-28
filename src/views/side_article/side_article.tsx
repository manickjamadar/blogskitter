"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { useRouter } from "next/navigation";
import SideBlogCard from "../side_blog_card/side_blog_card";
interface Props {
  excludeBlogId?: string;
}
const SideArticles: React.FC<Props> = ({ excludeBlogId = "" }) => {
  const router = useRouter();
  const blogs = useAppSelector((state) => state.blogs.values)
    .filter((b) => b.id !== excludeBlogId)
    .slice(0, 5);
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
