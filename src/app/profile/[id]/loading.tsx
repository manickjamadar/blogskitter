import ProfileBlogListSkeleton from "@/views/profile_blog_list_skeleton/profile_blog_list_skeleton";
import ProfileSkeleton from "@/views/profile_skeleton/profile_skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <div>
      <ProfileSkeleton />
      <ProfileBlogListSkeleton length={10} />
    </div>
  );
};

export default ProfileLoading;
