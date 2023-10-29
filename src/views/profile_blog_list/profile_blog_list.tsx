"use client";
import { IBlogModel } from "@/domain/models/blog";
import React, { useState } from "react";
import ProfileBlogCard from "../profile_blog_card/profile_blog_card";
import { useRouter } from "next/navigation";
import Modal from "../modal/modal";
import { blogService } from "@/services";
import DeleteConfirmationModal from "../delete_confirmation_modal/delete_confirmation_modal";
import usePaginate from "@/hooks/use_paginate";
import Paginate from "../paginate/paginate";
interface Props {
  blogs: IBlogModel[];
}
const ProfileBlogList: React.FC<Props> = ({ blogs }) => {
  const [deletableBlog, setDeletableBlog] = useState<IBlogModel | undefined>(
    undefined
  );
  const showDeleteModal = (blog: IBlogModel) => {
    setDeletableBlog(blog);
  };
  const closeDeleteModal = () => {
    setDeletableBlog(undefined);
  };
  const router = useRouter();
  const [blogList, setBlogList] = useState(blogs);
  const {
    pageCount,
    currentItems: currentBlogs,
    handlePageClick,
  } = usePaginate({
    items: blogList,
    itemsPerPage: 10,
  });
  const handleDelete = async (blog: IBlogModel) => {
    let deletableBlogIndex = -1;
    let deletableBlog: IBlogModel | undefined;
    setBlogList((oldBlogList) => {
      deletableBlogIndex = oldBlogList.findIndex((b) => b.id === blog.id);
      deletableBlog = oldBlogList.find((b) => b.id === blog.id);
      return oldBlogList.filter((b) => b.id !== blog.id);
    });
    const result = await blogService.deleteBlog(blog.id);
    if (result instanceof Error) {
      setBlogList((oldBlogList) => {
        const newBlogList = [...oldBlogList];
        if (deletableBlog && deletableBlogIndex >= 0) {
          newBlogList.splice(deletableBlogIndex, 0, deletableBlog);
        }
        return newBlogList;
      });
    }
  };
  if (blogList.length === 0) {
    return (
      <p className="text-2xl text-gray-300 p-10 text-center">
        No Blogs Available
      </p>
    );
  }
  return (
    <>
      <h2 className="text-xl font-medium text-gray-600 text-center">
        Your Blogs
      </h2>
      <p className="text-gray-500 text-sm text-center mb-4">
        You can create, edit and delete whatever you want
      </p>
      <div className="flex flex-col gap-3">
        {currentBlogs.map((blog) => (
          <ProfileBlogCard
            key={blog.id}
            blog={blog}
            onClick={() => router.push(`/blog/${blog.id}`)}
            onDeleteClick={() => showDeleteModal(blog)}
            onEditClick={() => router.push(`/blog/edit/${blog.id}`)}
          />
        ))}
      </div>
      <div className="mt-10">
        <Paginate onPageChange={handlePageClick} pageCount={pageCount} />
      </div>
      <Modal isOpen={!!deletableBlog} onClose={closeDeleteModal}>
        <DeleteConfirmationModal
          onDelete={() => {
            if (deletableBlog) {
              handleDelete(deletableBlog);
            }
            closeDeleteModal();
          }}
          onCancel={closeDeleteModal}
          title="Are you sure?"
          description="Do you really want to delete it? This process cannot be undone"
        />
      </Modal>
    </>
  );
};

export default ProfileBlogList;
