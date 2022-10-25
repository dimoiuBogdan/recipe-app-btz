import Image from "next/image";
import React, { FC } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { RecipeDetailsModel } from "../../models/RecipeModels";

const RecipeDetails: FC<
  Omit<
    RecipeDetailsModel,
    "ingredients" | "nutrients" | "steps" | "creator" | "type"
  >
> = ({ image, description, duration, recipeName, creatorUsername, likes }) => {
  return (
    <div className="my-6 text-center">
      <Image
        className="rounded-xl shadow-sm"
        src={image}
        alt={recipeName}
        width={300}
        height={250}
      />
      <div className="text-lg font-medium mt-1">
        {recipeName}
        <span className="text-zinc-500 ml-1 text-base">({duration})</span>
      </div>
      <div className="text-sm text-zinc-500 flex justify-center">
        by {creatorUsername} -
        <span className="flex items-center ml-1">
          {likes}
          <FaRegThumbsUp className="text-xs ml-1" />
        </span>
      </div>
      <div className="text-zinc-600">{description}</div>
    </div>
  );
};

export default RecipeDetails;
