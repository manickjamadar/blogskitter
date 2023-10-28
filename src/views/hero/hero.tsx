import React from "react";
const Hero = () => {
  return (
    <div className="flex flex-col gap-6 items-center py-10">
      <h1 className="text-center text-3xl sm:text-4xl font-bold max-w-4xl capitalize">
        Uncover fresh perspective, ideas and knowledge through the power of
        blogs
      </h1>
      <p className="text-center max-w-2xl text-sm sm:text-base">
        Blogskitter is an open platform where readers find dynamic thinking and
        where expert and undiscovered voices can share their writing on any
        topic
      </p>
      <div className="flex justify-center items-center">
        <a className="primaryButton" href="/#latest-articles">
          Explore Articles
        </a>
      </div>
    </div>
  );
};

export default Hero;
