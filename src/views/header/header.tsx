"use client";
import React from "react";
import Modal from "../modal/modal";
import AuthForm from "../auth_form/auth_form";
import useAuth from "@/hooks/use_auth";
import useAuthModal from "@/hooks/use_auth_modal";
import { authService } from "@/services";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isCreateBlogPath = pathname === "/blog/create";
  const { isLoggedIn, isLoggedOut, user } = useAuth();
  const {
    isSigningup,
    closeModal,
    openSigninModal,
    openSignupModal,
    isModalOpen,
  } = useAuthModal();
  const handleLogOut = () => {
    authService.signout();
  };
  return (
    <>
      <header className="flex justify-between p-4 border items-center">
        <h1 className="text-xl">
          <Link href="/">Blogskitter</Link>
        </h1>
        <div className="flex gap-6 items-center">
          {isLoggedOut && (
            <>
              <button className="outlineButton" onClick={openSigninModal}>
                Sign In
              </button>
              <button className="primaryButton" onClick={openSignupModal}>
                Sign Up
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              {user && <p>{user.name}</p>}
              {!isCreateBlogPath && (
                <Link href="/blog/create" className="outlineButton">
                  Create
                </Link>
              )}
              <button className="primaryButton" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          )}
        </div>
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
