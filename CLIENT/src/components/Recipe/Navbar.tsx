import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import { AuthContext } from "../../redux/AuthContext";
import ActionBar from "./ActionBar";

type NavbarProps = {
  recipeId: string;
  creatorId: string;
  personsWhoLiked: string[];
  getRecipeDetails: () => void;
};
const Navbar: FC<NavbarProps> = ({
  recipeId,
  creatorId,
  personsWhoLiked,
  getRecipeDetails,
}) => {
  const router = useRouter();
  const ref = useRef<any>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const { userId } = useContext(AuthContext);

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
      {userId && (
        <div
          onClick={() => setIsShown(!isShown)}
          ref={ref}
          className="relative flex justify-end"
        >
          <FaEllipsisH className="cursor-pointer" />
          <ActionBar
            isShown={isShown}
            recipeId={recipeId}
            creatorId={creatorId}
            personsWhoLiked={personsWhoLiked}
            getRecipeDetails={getRecipeDetails}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
