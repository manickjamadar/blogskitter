"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const profileId = params.id;
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const isUserAuthorized = isLoggedIn && user && user.id === profileId;
  useEffect(() => {
    if (!isUserAuthorized) {
      router.replace("/");
    }
  }, [isUserAuthorized, router]);
  if (!isUserAuthorized) {
    return null;
  }
  return <div>ProfilePage id: {profileId}</div>;
};

export default ProfilePage;
