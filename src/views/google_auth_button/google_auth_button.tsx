import Image from "next/image";
import React from "react";
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}
const GoogleAuthButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm border rounded w-full px-2 py-1 hover:bg-slate-50 flex items-center"
    >
      <Image src="/google_logo.svg" alt="Google Logo" width={26} height={26} />
      <span className="inline-block flex-1 text-center">{children}</span>
    </button>
  );
};

export default GoogleAuthButton;
