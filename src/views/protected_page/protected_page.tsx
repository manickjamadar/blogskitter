"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface Props {
  children: React.ReactNode;
  redirectUrl?: string;
}
const ProtectedPage: React.FC<Props> = ({ children, redirectUrl = "/" }) => {
  const router = useRouter();
  const { isLoggedOut } = useAuth();
  useEffect(() => {
    if (isLoggedOut) {
      router.replace(redirectUrl);
    }
  }, [router, isLoggedOut, redirectUrl]);
  if (isLoggedOut) {
    return null;
  }
  return children;
};

export default ProtectedPage;
