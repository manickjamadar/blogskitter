import React from "react";
import Logo from "../logo/logo";
import Image from "next/image";
import { FaLinkedinIn, FaGlobeAsia } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
const Footer = () => {
  return (
    <footer className="bg-blue-50">
      <div className="flex flex-col items-center gap-6 py-10 px-8">
        <div className="flex flex-col items-center gap-2">
          <Logo size={40} />
          <h3 className="font-bold uppercase text-xl md:text-2xl text-gray-600">
            Blogskitter
          </h3>
        </div>
        <p className="text-sm sm:text-base text-center max-w-sm font-medium text-gray-600">
          Is there a challenge your organization or company needs to solve?
          We&apos;d love to discus it
        </p>
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/manick-profile-pic.png"
            alt="Manick profile picture"
            width={76}
            height={76}
            className="rounded-full"
          />
          <div className="text-center flex flex-col">
            <p className="text-sm font-medium italic text-gray-400">
              Creator of Blogskitter
            </p>
            <p className="text-xl font-bold text-gray-600">Manick Jamadar</p>
            <p className="text-sm text-gray-600 font-medium">
              Developer & Designer
            </p>
          </div>
          <a
            className="primaryButton"
            href="https://calendly.com/manickjamadar/meet-with-manick"
            target="_blank"
          >
            Book Meeting
          </a>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/manickjamadar/"
              target="_blank"
              className="w-9 h-9 border rounded-full flex justify-center items-center text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://manickjamadar.com"
              target="_blank"
              className="w-9 h-9 border rounded-full flex justify-center items-center text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-colors"
            >
              <FaGlobeAsia />
            </a>
            <a
              href="mailto:manickware@gmail.com"
              target="_blank"
              className="w-9 h-9 border rounded-full flex justify-center items-center text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-colors"
            >
              <IoMdMail />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-2 md:justify-between px-8 py-4 border-t">
        <p className="text-center text-sm text-gray-500 font-medium">
          &copy; 2023 Blogskitter. All Rights Reserved
        </p>
        <p className="text-center text-sm text-gray-500 font-medium">
          Made with ❤️ by{" "}
          <a
            href="https://manickjamadar.com"
            target="_blank"
            className="text-gray-500 hover:text-gray-600 font-bold"
          >
            Manick Jamadar
          </a>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
