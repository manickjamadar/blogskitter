import { useState } from "react";
interface Props<T> {
  itemsPerPage: number;
  items: T[];
}
const usePaginate = <T>({ itemsPerPage, items }: Props<T>) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return {
    pageCount,
    currentItems,
    handlePageClick,
  };
};
export default usePaginate;
