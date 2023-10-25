import React from "react";
import ProfileBlogCardSkeleton from "../profile_blog_card_skeleton/profile_blog_card_skeleton";
interface Props {
  length: number;
}
const ProfileBlogListSkeleton: React.FC<Props> = ({ length }) => {
  return (
    <div className="max-w-2xl p-5 mx-auto">
      {Array.from({ length }, (_, index) => (
        <ProfileBlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProfileBlogListSkeleton;
