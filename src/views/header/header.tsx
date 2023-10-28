"use client";
import React from "react";
import Modal from "../modal/modal";
import AuthForm from "../auth_form/auth_form";
import useAuth from "@/hooks/use_auth";
import useAuthModal from "@/hooks/use_auth_modal";
import { authService } from "@/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { AuthActions } from "@/store/slices/auth_slice";
import HeaderProfile from "./header_profile";
import HeaderProfileSkeleton from "./header_profile_skeleton";
import Image from "next/image";
import Logo from "../logo/logo";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn, isLoggedOut, user, isAuthenticating } = useAuth();
  const {
    isSigningup,
    closeModal,
    openSigninModal,
    openSignupModal,
    isModalOpen,
  } = useAuthModal();
  const handleLogOut = () => {
    dispatch(AuthActions.startAuthenticating());
    authService.signout();
  };
  return (
    <>
      <header className="flex justify-between px-8 py-4 items-center flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Logo size={36} />
          <h1 className="hidden sm:block font-bold uppercase text-xl text-gray-600">
            <Link href="/">BlogSkitter</Link>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          {isAuthenticating && <HeaderProfileSkeleton />}
          {!isAuthenticating && isLoggedOut && (
            <>
              <button className="outlineButton" onClick={openSigninModal}>
                Sign In
              </button>
              <button className="primaryButton" onClick={openSignupModal}>
                Sign Up
              </button>
            </>
          )}
        </div>
        {!isAuthenticating && isLoggedIn && user && (
          <HeaderProfile
            name={user.name}
            onProfileClick={() => router.push(`/profile/${user.id}`)}
            onAddClick={() => router.push("/blog/create")}
            onLogoutClick={handleLogOut}
          />
        )}
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthForm
          isSigningup={isSigningup}
          onSigninClick={openSigninModal}
          onSignupClick={openSignupModal}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  );
};

export default Header;
