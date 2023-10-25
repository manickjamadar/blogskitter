const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="w-28 h-28 rounded-full bg-gray-100 mx-auto relative overflow-hidden"></div>
      <h1 className="text-2xl font-bold text-gray-600 text-center capitalize max-w-xs w-1/3 h-5 rounded bg-gray-100 mx-auto"></h1>
      <p className="text-center text-lg text-gray-400 italic max-w-xs w-1/4 h-5 rounded bg-gray-100 mx-auto"></p>
    </div>
  );
};

export default ProfileSkeleton;
