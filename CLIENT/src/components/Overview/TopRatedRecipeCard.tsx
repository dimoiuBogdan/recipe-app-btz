import Image from "next/image";
import { FC } from "react";
import { FaRegClock, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { TopRatedRecipe } from "../../models/RecipeModels";

const TopRatedRecipeCard: FC<TopRatedRecipe> = ({
  id,
  likes,
  title,
  image,
  creator,
  duration,
}) => {
  const redirectToRecipe = () => {
    return;
  };

  return (
    <div
      onClick={redirectToRecipe}
      className="w-full relative rounded-md shadow-md bg-center bg-cover h-80 overflow-hidden text-white p-2 flex flex-col justify-end"
    >
      <Image
        alt="top_rated_recipe_image"
        src={image}
        layout="fill"
        className="object-cover object-center z-0 brightness-75"
      />
      <div className="z-10">
        <div className="font-medium text-lg">{title}</div>
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
