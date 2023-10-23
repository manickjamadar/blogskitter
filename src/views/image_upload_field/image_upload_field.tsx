import React from "react";
import Image from "next/image";
interface Props {
  image: File | null | undefined;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}
const ImageUploadField: React.FC<Props> = ({
  image,
  id,
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <p className="mb-2">Cover Image</p>
      <label htmlFor="coverImage" className="cursor-pointer">
        <div className="w-full aspect-video rounded bg-blue-50 p-4 relative">
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              fill
              className="object-cover rounded"
              alt="Cover Image"
            />
          ) : (
            <div className="w-full aspect-video border-2 border-slate-200 border-dashed flex flex-col justify-center items-center rounded gap-2">
              <div className="border border-blue-300 text-blue-400 bg-blue-100 px-6 py-1 rounded-full text-sm">
                + Upload
              </div>
              <p className="text-xs text-gray-400">Supports JPG,PNG, Max 1MB</p>
            </div>
          )}
          {image && (
            <div className="text-xs font-medium absolute top-0 right-0 text-gray-500 bg-white bg-opacity-80 px-6 py-1 rounded-bl-xl">
              Change Cover
            </div>
          )}
        </div>
      </label>
      <input
        type="file"
        id={id}
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />
      {errorMessage && <p className="inputErrorMessage mt-2">{errorMessage}</p>}
    </div>
  );
};

export default ImageUploadField;
