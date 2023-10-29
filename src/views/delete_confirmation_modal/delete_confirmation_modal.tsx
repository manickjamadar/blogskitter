import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
interface Props {
  title: string;
  description: string;
  onCancel?: () => void;
  onDelete?: () => void;
}
const DeleteConfirmationModal: React.FC<Props> = ({
  title,
  description,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="p-6 flex flex-col gap-4 items-center">
      <div className="text-3xl w-16 h-16 rounded-full border-red-400 bg-red-50 text-red-500 flex justify-center items-center">
        <BiSolidError />
      </div>
      <h3 className="text-xl text-gray-600">{title}</h3>
      <p className="text-sm text-gray-400 text-center max-w-xs">
        {description}
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="outlineButton" onClick={onCancel}>
          Cancel
        </button>
        <button className="errorButton" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
