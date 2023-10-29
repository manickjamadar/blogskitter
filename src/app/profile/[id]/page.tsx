import { apiAuthService, apiBlogService } from "@/api_services";
import ApiError from "@/domain/error/api_error";
import AuthorizedPage from "@/views/authorized_page/authorized_page";
import Container from "@/views/container/container";
import Profile from "@/views/profile/profile";
import ProfileBlogList from "@/views/profile_blog_list/profile_blog_list";
import React from "react";
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const profileId = params.id;
  const userOrError = await apiAuthService.getUserById(profileId);
  if (userOrError instanceof ApiError) {
    return <p>User is invalid</p>;
  }
  const blogsOrError = await apiBlogService.getBlogsByUserId(profileId);
  if (blogsOrError instanceof ApiError) {
    return <p>Blogs fetching failed</p>;
  }
  return (
    <AuthorizedPage userId={profileId}>
      <Container>
        <Profile email={userOrError.email} name={userOrError.name} />
        <div className="max-w-2xl mx-auto py-10">
          <ProfileBlogList blogs={blogsOrError} />
        </div>
      </Container>
    </AuthorizedPage>
  );
};

export default ProfilePage;
