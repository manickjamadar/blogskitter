"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface Props {
  userId: string;
  children: React.ReactNode;
}
const AuthorizedPage: React.FC<Props> = ({ userId, children }) => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const isUserAuthorized = isLoggedIn && user && user.id === userId;
  useEffect(() => {
    if (!isUserAuthorized) {
      router.replace("/");
    }
  }, [isUserAuthorized, router]);
  if (!isUserAuthorized) {
    return null;
  }
  return children;
};

export default AuthorizedPage;
