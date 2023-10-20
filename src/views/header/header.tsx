"use client";
import React from "react";
import Modal from "../modal/modal";
import AuthForm, { AuthFormData } from "../auth_form/auth_form";
import UserModel from "@/domain/models/user";
import useAuth from "@/hooks/use_auth";
import useAuthModal from "@/hooks/use_auth_modal";

const Header = () => {
  const { isLoggedIn, isLoggedOut, user, logout, signup, signin } = useAuth();
  const {
    isSigningup,
    closeModal,
    openSigninModal,
    openSignupModal,
    isModalOpen,
  } = useAuthModal();
  const handleAuthSubmit = (data: AuthFormData, isSigningup: boolean) => {
    const id = Math.random().toString();
    const user: UserModel = {
      id,
      email: data.email,
      name: data.name || "Annonymous",
    };
    if (isSigningup) {
      signup(user);
    } else {
      signin(user);
    }
    closeModal();
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
              <button className="primaryButton" onClick={logout}>
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
          onSubmit={handleAuthSubmit}
        />
      </Modal>
    </>
  );
};

export default Header;
