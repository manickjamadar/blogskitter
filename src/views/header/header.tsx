import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-4 border-b-2 items-center">
      <h1 className="text-xl">Blogskitter</h1>
      <div className="flex gap-6">
        <button className="border border-blue-500 px-4 py-2 rounded">
          Sign In
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
