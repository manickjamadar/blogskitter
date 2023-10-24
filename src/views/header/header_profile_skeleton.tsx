"use client";
import formatFullName from "@/utils/format_full_name";
import profilePic from "./profile-pic.png";
import { AiOutlinePoweroff, AiOutlinePlus } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
const HeaderProfileSkeleton = () => {
  const pathname = usePathname();
  const hideAddButton = pathname === "/blog/create";
  return (
    <div className="flex gap-3">
      <div className="border py-1 pl-2 pr-4 rounded-full flex gap-2 items-center hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden border-t-2 border-gray-300 animate-spin"></div>
        <p className="text-sm w-12 h-3 rounded bg-gray-100 animate-pulse"></p>
      </div>
      <button className="bg-gray-100 w-9 h-9 rounded-full flex justify-center items-center border-t-2 border-gray-300 animate-spin"></button>
      <button className="bg-gray-100 w-9 h-9 rounded-full flex justify-center items-center border-t-2 border-gray-300 animate-spin"></button>
    </div>
  );
};

export default HeaderProfileSkeleton;
