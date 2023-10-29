import Container from "@/views/container/container";
import SideBlogCardSkeleton from "@/views/side_blog_card_skeleton/side_blog_card_skeleton";
import React from "react";

const BlogLoading = () => {
  return (
    <Container>
      <div className="flex gap-6 mt-20 animate-pulse">
        <div className="w-full lg:w-2/3">
          <p className="mb-4 text-gray-500 text-sm italic w-1/2 h-3 rounded bg-gray-100"></p>
          <p className="text-gray-400 italic text-sm mb-2 w-1/4 h-3 rounded bg-gray-100"></p>
          <h1 className="text-2xl font-bold mb-4 capitalize w-10/12 h-4 rounded bg-gray-200"></h1>
          <div className="rounded-lg overflow-hidden mb-4 bg-gray-100 w-full aspect-video"></div>
        </div>
        <div className="pt-12 hidden lg:block w-1/3">
          <div className="">
            <h3 className="text-xl text-center text-gray-700 font-medium mb-4 w-1/2 h-4 bg-gray-100 mx-auto rounded"></h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <SideBlogCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogLoading;
