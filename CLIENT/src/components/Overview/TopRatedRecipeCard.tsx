import Image from "next/image";
import { FC } from "react";
import { FaRegClock, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { TopRatedRecipeModel } from "../../models/RecipeModels";

const TopRatedRecipeCard: FC<TopRatedRecipeModel> = ({
  _id,
  likes,
  image,
  creator,
  duration,
  recipeName,
}) => {
  const redirectToRecipe = () => {
    return;
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .5)), url(${image})`,
      }}
      onClick={redirectToRecipe}
      className="w-full bg-cover bg-center relative rounded-md shadow-md h-80 overflow-hidden text-white p-2 flex flex-col justify-end"
    >
      <div className="z-10">
        <div className="font-medium text-lg">{recipeName}</div>
        <div className="flex items-center text-zinc-100 text-sm font-medium">
          <div className="pr-3 flex items-center">
            <FaRegClock className="mr-1" />
            {duration}
          </div>
          <div className="pr-3 flex items-center">
            <FaRegThumbsUp className="mr-1" />
            {likes}
          </div>
          <div className="flex items-center">
            <FaRegUser className="mr-1" />
            {creator}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedRecipeCard;
