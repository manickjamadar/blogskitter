"use client";
import { db } from "@/config/firebase";
import config from "@/domain/config";
import { BlogsActions } from "@/store/slices/blogs_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import fromFirebaseToBlogModel from "@/utils/fromFirebaseToBlogModel";
import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
  useEffect(() => {
    const nowTimeStamp = Timestamp.fromDate(new Date());
    const q = query(
      collection(db, "blog"),
      where("createdDate", ">", nowTimeStamp)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const data = change.doc.data();
          dispatch(BlogsActions.merge(fromFirebaseToBlogModel(data)));
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return children;
};

export default BlogProvider;
