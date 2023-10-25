import React from "react";
import RawImage from "../raw_image/raw_image";
interface Props {
  alt: string;
  src: string;
  errorSrc: string;
}
const CustomImage: React.FC<Props> = ({ alt, src, errorSrc }) => {
  return (
    <div className="bg-gray-100 aspect-video w-full relative">
      <RawImage alt={alt} src={src} errorSrc={errorSrc} />
    </div>
  );
};

export default CustomImage;
