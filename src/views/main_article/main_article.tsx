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
    <div className="flex gap-10 w-10/12 pt-10 max-w-6xl mx-auto">
      <div className="flex-[3]">
        <p className="mb-1 text-gray-500 text-sm italic">Home / blog</p>
        <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
        <div className="rounded-lg overflow-hidden mb-4">
          <CustomImage
            src={coverImageUrl}
            alt="Blog Image"
            errorSrc="/images/blog-cover-error-placeholder.png"
          />
        </div>
        <p className="text-gray-400 italic text-sm mb-4">
          Created at {formatDate(new Date(createdDate))}
        </p>
        <p className="text-gray-600">{description}</p>
        <DemoBlogContent />
      </div>
      <div className="hidden lg:block flex-1">
        <SideArticles />
      </div>
    </div>
  );
};

export default MainArticle;
