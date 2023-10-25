"use client";
import Image from "next/image";
import React, { useState } from "react";
interface Props {
  alt: string;
  src: string;
  errorSrc: string;
}
const RawImage: React.FC<Props> = ({ alt, src, errorSrc }) => {
  const [actualSrc, setActualSrc] = useState(src ? src : errorSrc);
  const placeholderDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/OXbHwAJmgPbgNt2+QAAAABJRU5ErkJggg==";
  return (
    <Image
      src={actualSrc}
      alt={alt}
      fill
      className="object-cover"
      placeholder={placeholderDataUrl}
      onError={() => setActualSrc(errorSrc)}
    />
  );
};

export default RawImage;
