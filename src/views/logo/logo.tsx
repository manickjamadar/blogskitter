import React from "react";
import Image from "next/image";
interface Props {
  size: number;
}
const Logo: React.FC<Props> = ({ size }) => {
  return (
    <Image
      src="/images/blogskitter-logo.svg"
      alt="blog skitter logo"
      width={size}
      height={size}
    />
  );
};

export default Logo;
