import React from "react";

const BlogFormSkeleton = () => {
  return (
    <div className="w-10/12 max-w-lg mx-auto mt-5 rounded p-5">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center mb-2 mx-auto rounded bg-gray-100 w-1/3 max-w-xs h-8 animate-pulse"></h2>
      <p className="text-sm sm:text-base text-center text-gray-500 mb-6 mx-auto rounded bg-gray-100 w-1/5 max-w-xs h-4 animate-pulse"></p>
      <form className="flex flex-col gap-4">
        <div className="inputContainer">
          <label className="rounded bg-gray-100 w-20 h-3 animate-pulse"></label>
          <input className="" />
        </div>
        <div className="inputContainer">
          <label className="rounded bg-gray-100 w-20 h-3 animate-pulse"></label>
          <input className="" />
        </div>
        <div className="w-full aspect-video rounded bg-gray-100 p-4 animate-pulse"></div>
      </form>
    </div>
  );
};
export default BlogFormSkeleton;
