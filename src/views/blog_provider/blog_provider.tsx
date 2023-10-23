"use client";
import config from "@/domain/config";
import { BlogsActions } from "@/store/slices/blogs_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect } from "react";

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const shouldFetchBlogsInitially = useAppSelector(
    (state) => state.blogs.state === "idle"
  );
  useEffect(() => {
    if (shouldFetchBlogsInitially) {
      dispatch(
        BlogsActions.fetchBlogs({
          limit: config.blog.fetchingLimit,
          skip: 0,
          isInitialFetching: true,
        })
      );
    }
  }, [shouldFetchBlogsInitially, dispatch]);

  return children;
};

export default BlogProvider;
