"use client";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
interface Props {
  children: React.ReactNode;
}
const StoreProvider: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
