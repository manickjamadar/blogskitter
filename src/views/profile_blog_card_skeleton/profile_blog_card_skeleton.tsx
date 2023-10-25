import { MdDelete, MdEdit } from "react-icons/md";

const ProfileBlogCardSkeleton = () => {
  return (
    <div className="border-b rounded p-4 flex gap-4 overflow-hidden text-ellipsis items-center">
      <div className="w-20 min-w-[5rem] self-stretch bg-gray-100 rounded overflow-hidden relative">
        {/* <RawImage
            src={blog.coverImageUrl}
            errorSrc="/images/blog-cover-error-placeholder.png"
            alt="blog cover image"
          /> */}
      </div>
      <div className="flex-1 overflow-hidden text-ellipsis flex flex-col gap-1">
        <h3 className="capitalize font-bold text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis w-7/12 h-4 bg-gray-100 rounded">
          {/* {blog.title} */}
        </h3>
        <p className="text-xs italic text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis w-9 h-3 bg-gray-100 rounded">
          {/* created at {formatDate(new Date(blog.createdDate))} */}
        </p>
        <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis w-10/12 h-4 bg-gray-100 rounded"></p>
      </div>
      <button className="text-lg text-gray-100">
        <MdEdit />
      </button>
      <button className="text-lg text-gray-100">
        <MdDelete />
      </button>
    </div>
  );
};
export default ProfileBlogCardSkeleton;
