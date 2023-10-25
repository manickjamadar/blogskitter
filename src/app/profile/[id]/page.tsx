import AuthorizedPage from "@/views/authorized_page/authorized_page";
import React, { useEffect } from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const profileId = params.id;
  return (
    <AuthorizedPage userId={profileId}>
      <div>ProfilePage id: {profileId}</div>
    </AuthorizedPage>
  );
};

export default ProfilePage;
