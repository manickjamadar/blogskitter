import { useState } from "react";

interface UseAuthModalReturnType {
  isModalOpen: boolean;
  isModalClose: boolean;
  isSigningin: boolean;
  isSigningup: boolean;
  closeModal: () => void;
  openSigninModal: () => void;
  openSignupModal: () => void;
}
const useAuthModal = (): UseAuthModalReturnType => {
  // Auth Modal State => 0 for close, 1 for Signin, 2 for Signup
  const [authModalState, setAuthModalState] = useState(0);
  const openSigninModal = () => {
    setAuthModalState(1);
  };
  const openSignupModal = () => {
    setAuthModalState(2);
  };
  const closeModal = () => {
    setAuthModalState(0);
  };
  const isModalOpen = authModalState !== 0;
  const isModalClose = authModalState === 0;
  const isSigningin = authModalState === 1;
  const isSigningup = authModalState === 2;
  return {
    closeModal,
    isModalOpen,
    isModalClose,
    isSigningin,
    isSigningup,
    openSigninModal,
    openSignupModal,
  };
};
export default useAuthModal;
