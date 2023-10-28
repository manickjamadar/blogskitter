import React from "react";
import { AiOutlineClose } from "react-icons/ai";
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
      <div className="text-2xl w-14 h-14 rounded-full border-2 border-red-500 text-red-500 flex justify-center items-center">
        <AiOutlineClose />
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
