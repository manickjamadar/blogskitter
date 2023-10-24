import React from "react";

const BlogLoading = () => {
  return (
    <div className="p-10 max-w-xl mx-auto">
      <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video w-full relative mb-4"></div>
      <h1 className="text-2xl font-bold mb-2 capitalize w-10/12 h-5 bg-gray-200 rounded"></h1>
      <p className="text-gray-400 italic text-sm mb-4 w-1/3 h-3 bg-gray-100 rounded"></p>
      <p className="text-gray-600 w-full h-4 bg-gray-100 rounded mb-2"></p>
      <p className="text-gray-600 w-9/12 h-4 bg-gray-100 rounded"></p>
    </div>
  );
};

export default BlogLoading;
