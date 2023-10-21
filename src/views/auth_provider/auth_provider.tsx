"use client";
import { auth } from "@/config/firebase";
import UserModel from "@/domain/models/user";
import { AuthActions } from "@/store/slices/auth_slice";
import { useAppDispatch } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName && user.email) {
        const userModel: UserModel = {
          id: user.uid,
          name: user.displayName || "Annonymous",
          email: user.email,
        };
        dispatch(AuthActions.login({ user: userModel }));
      } else {
        dispatch(AuthActions.logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return children;
};

export default AuthProvider;
