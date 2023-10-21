"use client";
import React from "react";
import Modal from "../modal/modal";
import AuthForm from "../auth_form/auth_form";
import useAuth from "@/hooks/use_auth";
import useAuthModal from "@/hooks/use_auth_modal";
import { firebaseAuthService } from "@/services";

const Header = () => {
  const { isLoggedIn, isLoggedOut, user } = useAuth();
  const {
    isSigningup,
    closeModal,
    openSigninModal,
    openSignupModal,
    isModalOpen,
  } = useAuthModal();
  const handleLogOut = () => {
    firebaseAuthService.signout();
  };
  return (
    <>
      <div className="flex justify-between p-4 border-b-2 items-center">
        <h1 className="text-xl">Blogskitter</h1>
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
              <button className="primaryButton" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
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
