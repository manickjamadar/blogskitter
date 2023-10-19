"use client";
import React, { useState } from "react";
import Modal from "../modal/modal";
import AuthForm, { AuthFormData } from "../auth_form/auth_form";

const Header = () => {
  // Auth Modal State => 0 for close, 1 for Signin, 2 for Signup
  const [authModalState, setAuthModalState] = useState(0);
  const openSigninModal = () => {
    setAuthModalState(1);
  };
  const openSignupModal = () => {
    setAuthModalState(2);
  };
  const closeAuthModal = () => {
    setAuthModalState(0);
  };
  const handleAuthSubmit = (data: AuthFormData, isSignup: boolean) => {
    console.log("Auth Form Data: ", data);
  };
  const isModalOpen = authModalState !== 0;
  //   const isSigninModalOpen = authModalState === 1;
  const isSignupModalOpen = authModalState === 2;
  return (
    <>
      <div className="flex justify-between p-4 border-b-2 items-center">
        <h1 className="text-xl">Blogskitter Manick lala</h1>
        <div className="flex gap-6">
          <button
            className="border border-blue-500 px-4 py-2 rounded"
            onClick={openSigninModal}
          >
            Sign In
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={openSignupModal}
          >
            Sign Up
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeAuthModal}>
        <AuthForm
          isSignup={isSignupModalOpen}
          onSigninClick={openSigninModal}
          onSignupClick={openSignupModal}
          onSubmit={handleAuthSubmit}
        />
      </Modal>
    </>
  );
};

export default Header;
