import React from "react";
interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center"
          onClick={onClose}
        >
          <div
            className="bg-white rounded"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
