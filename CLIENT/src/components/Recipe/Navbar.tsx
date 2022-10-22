import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import ActionBar from "./ActionBar";

type NavbarProps = {
  creatorId: string;
  recipeId: string;
};
const Navbar: FC<NavbarProps> = ({ creatorId, recipeId }) => {
  const router = useRouter();
  const ref = useRef<any>(null);
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="items-center justify-between flex text-xl">
      <FaChevronLeft
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer"
      />
      <div className="flex-1 text-center">Recipe Details</div>
      <div
        onClick={() => setIsShown(!isShown)}
        ref={ref}
        className="relative flex justify-end"
      >
        <FaEllipsisH className="cursor-pointer" />
        <ActionBar
          recipeId={recipeId}
          creatorId={creatorId}
          isShown={isShown}
        />
      </div>
    </div>
  );
};

export default Navbar;
