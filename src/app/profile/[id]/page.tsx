import React from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const profileId = params.id;
  return <div>ProfilePage id: {profileId}</div>;
};

export default ProfilePage;
