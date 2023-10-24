"use client";
import formatFullName from "@/utils/format_full_name";
import profilePic from "./profile-pic.png";
import { AiOutlinePoweroff, AiOutlinePlus } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface Props {
  name: string;
  onProfileClick?: () => void;
  onAddClick?: () => void;
  onLogoutClick?: () => void;
}
const HeaderProfile: React.FC<Props> = ({
  name,
  onAddClick,
  onLogoutClick,
  onProfileClick,
}) => {
  const pathname = usePathname();
  const hideAddButton = pathname === "/blog/create";
  return (
    <div className="flex gap-3">
      <div
        className="border py-1 pl-2 pr-4 rounded-full flex gap-2 items-center hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={onProfileClick}
      >
        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
          <Image
            src={profilePic}
            width={24}
            height={24}
            alt="profile picture"
          />
        </div>
        <p className="text-sm">{formatFullName(name)}</p>
      </div>
      {!hideAddButton && (
        <button
          className="border w-9 h-9 rounded-full flex justify-center items-center text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          title="Create Blog"
          onClick={onAddClick}
        >
          <AiOutlinePlus />
        </button>
      )}
      <button
        className="border w-9 h-9 rounded-full flex justify-center items-center text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors"
        title="Log Out"
        onClick={onLogoutClick}
      >
        <AiOutlinePoweroff />
      </button>
    </div>
  );
};

export default HeaderProfile;
