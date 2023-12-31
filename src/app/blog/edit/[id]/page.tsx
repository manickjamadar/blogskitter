import { apiBlogService } from "@/api_services";
import ApiError from "@/domain/error/api_error";
import BlogForm from "@/views/blog_form/blog_form";
import ProtectedPage from "@/views/protected_page/protected_page";
import React from "react";

const BlogEditPage = async ({ params }: { params: { id: string } }) => {
  const blogId = params.id;
  const blogOrError = await apiBlogService.getBlogById(blogId);
  if (blogOrError instanceof ApiError) {
    return <p className="text center p-4">Blog loading failed</p>;
  }
  return (
    <ProtectedPage>
      <BlogForm editableBlog={blogOrError} />
    </ProtectedPage>
  );
};

export default BlogEditPage;
