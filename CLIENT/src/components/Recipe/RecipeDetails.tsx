import Image from "next/image";
import React, { FC } from "react";
import { RecipeDetailsModel } from "../../models/RecipeModels";

const RecipeDetails: FC<
  Omit<RecipeDetailsModel, "ingredients" | "nutrients" | "steps" | "creator">
> = ({ image, description, duration, recipeName, type, creatorUsername }) => {
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
      <div className="text-sm text-zinc-500">by {creatorUsername}</div>
      <div className="text-zinc-600">{description}</div>
    </div>
  );
};

export default RecipeDetails;
