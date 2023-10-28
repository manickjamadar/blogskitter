import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="mx-auto w-10/12 max-w-5xl pt-10 pb-10">{children}</div>
    <div className="px-8 max-w-7xl mx-auto">{children}</div>
  );
};

export default Container;
