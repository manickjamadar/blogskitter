import profilePic from "../../assets/images/profile-pic.png";
import Image from "next/image";
import React from "react";
interface Props {
  name: string;
  email: string;
}
const Profile: React.FC<Props> = ({ name, email }) => {
  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="w-28 h-28 rounded-full bg-gray-100 mx-auto relative overflow-hidden">
        <Image
          src={profilePic}
          fill
          className="object-cover"
          alt="profile picture"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-600 text-center capitalize">
        {name}
      </h1>
      <p className="text-center text-lg text-gray-400 italic">{email}</p>
    </div>
  );
};

export default Profile;
