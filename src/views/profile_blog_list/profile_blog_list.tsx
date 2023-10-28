"use client";
import { IBlogModel } from "@/domain/models/blog";
import React, { useState } from "react";
import ProfileBlogCard from "../profile_blog_card/profile_blog_card";
import { useRouter } from "next/navigation";
import Modal from "../modal/modal";
import { blogService } from "@/services";
import DeleteConfirmationModal from "../delete_confirmation_modal/delete_confirmation_modal";
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
      <div className="max-w-2xl p-5 mx-auto">
        {blogList.map((blog) => (
          <ProfileBlogCard
            key={blog.id}
            blog={blog}
            onDeleteClick={() => showDeleteModal(blog)}
            onEditClick={() => router.push(`/blog/edit/${blog.id}`)}
          />
        ))}
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
