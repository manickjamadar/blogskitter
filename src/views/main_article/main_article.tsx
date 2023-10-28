import { IBlogModel } from "@/domain/models/blog";
import React from "react";
import CustomImage from "../custom_image/custom_image";
import formatDate from "@/utils/format_date";
import DemoBlogContent from "../demo_blog_content/demo_blog_content";
import SideArticles from "../side_article/side_article";
interface Props {
  blog: IBlogModel;
}
const MainArticle: React.FC<Props> = ({ blog }) => {
  const { coverImageUrl, createdDate, description, title } = blog;
  return (
    <div className="flex gap-6 mt-20">
      <div className="w-full lg:w-2/3">
        <p className="mb-4 text-gray-500 text-sm italic">
          Home / blog /{" "}
          <span className="text-gray-600 font-medium">{title}</span>
        </p>
        <p className="text-gray-400 italic text-sm mb-1">
          Created at {formatDate(new Date(createdDate))}
        </p>
        <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
        <div className="rounded-lg overflow-hidden mb-4">
          <CustomImage
            src={coverImageUrl}
            alt="Blog Image"
            errorSrc="/images/blog-cover-error-placeholder.png"
          />
        </div>
        <p className="text-gray-600">{description}</p>
        <DemoBlogContent />
      </div>
      <div className="pt-16 hidden lg:block w-1/3">
        <SideArticles />
      </div>
    </div>
  );
};

export default MainArticle;
