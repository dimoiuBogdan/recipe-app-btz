import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import ActionBar from "./ActionBar";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="items-center justify-between flex text-xl">
      <FaChevronLeft
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer"
      />
      <div>Recipe Details</div>
      <div className="relativ">
        <FaEllipsisH className="cursor-pointer" />
        <ActionBar />
      </div>
    </div>
  );
};

export default Navbar;
