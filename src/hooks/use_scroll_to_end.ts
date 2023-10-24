import { useEffect } from "react";

const useScrollToEnd = (onScrollToEnd: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      const windowHeight = window.innerHeight;
      if (scrollTop + windowHeight >= offsetHeight) {
        onScrollToEnd();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onScrollToEnd]);
};
export default useScrollToEnd;
