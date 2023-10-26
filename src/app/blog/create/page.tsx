"use client";
import BlogForm from "@/views/blog_form/blog_form";
import ProtectedPage from "@/views/protected_page/protected_page";
import React, { useState } from "react";
const CreateBlogPage = () => {
  return (
    <ProtectedPage>
      <BlogForm />
    </ProtectedPage>
  );
};

export default CreateBlogPage;
