import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
interface Props {
  onPageChange: (event: { selected: number }) => void;
  pageCount: number;
}
const Paginate: React.FC<Props> = ({ onPageChange, pageCount }) => {
  const [selected, setSelected] = useState(1);
  const canGoPrevious = selected > 1;
  const canGoNext = selected < pageCount;
  const handleNext = () => {
    if (canGoNext) {
      setSelected((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (canGoPrevious) {
      setSelected((prev) => prev - 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      setSelected(pageNumber);
    }
  };
  useEffect(() => {
    onPageChange({ selected: selected - 1 });
  }, [selected, onPageChange]);
  if (pageCount < 1) {
    return null;
  }
  return (
    <ul className="paginateContainer">
      <li
        className={`previous ${canGoPrevious ? "" : "disabled"}`}
        onClick={handlePrevious}
      >
        <IoIosArrowBack />
      </li>
      {Array.from({ length: pageCount }, (_, index) => (
        <li
          key={index}
          className={`page ${selected === index + 1 ? "selected" : ""}`}
          onClick={() => handlePageClick(index + 1)}
        ></li>
      ))}
      <li
        className={`next ${canGoNext ? "" : "disabled"}`}
        onClick={handleNext}
      >
        <IoIosArrowForward />
      </li>
    </ul>
  );
};

export default Paginate;
