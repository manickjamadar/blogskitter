import { apiAuthService } from "@/api_services";
import { getDemoBlogData } from "@/domain/data/demo_blog_data";
import ApiError from "@/domain/error/api_error";
import { IBlogModel } from "@/domain/models/blog";
import UserModel from "@/domain/models/user";
import AuthorizedPage from "@/views/authorized_page/authorized_page";
import Profile from "@/views/profile/profile";
import ProfileBlogList from "@/views/profile_blog_list/profile_blog_list";
import React from "react";
const getProfile = (userId: string): Promise<UserModel> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: "manickware@gmail.com",
        id: userId,
        name: "Manick Lal Jamadar",
      });
    }, 3000);
  });
};
const getBlogsByUserId = (userId: string): Promise<IBlogModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDemoBlogData(10, 0));
    }, 3000);
  });
};
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const profileId = params.id;
  const userOrError = await apiAuthService.getUserById(profileId);
  if (userOrError instanceof ApiError) {
    return <p>User is invalid</p>;
  }
  const blogs = await getBlogsByUserId(profileId);
  return (
    <AuthorizedPage userId={profileId}>
      <div className="py-4">
        <Profile email={userOrError.email} name={userOrError.name} />
        <ProfileBlogList blogs={blogs} />
      </div>
    </AuthorizedPage>
  );
};

export default ProfilePage;
