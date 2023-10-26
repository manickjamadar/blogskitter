"use client";
import Image from "next/image";
import React, { useState } from "react";
interface Props {
  alt: string;
  src: string;
  errorSrc: string;
}
const RawImage: React.FC<Props> = ({ alt, src, errorSrc }) => {
  const [hasError, setHasError] = useState(src ? false : true);
  const placeholderDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/OXbHwAJmgPbgNt2+QAAAABJRU5ErkJggg==";
  return hasError ? (
    <Image
      src={errorSrc}
      alt={alt}
      fill
      className="object-cover"
      placeholder={placeholderDataUrl}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      placeholder={placeholderDataUrl}
      onError={(e) => setHasError(true)}
    />
  );
};

export default RawImage;
