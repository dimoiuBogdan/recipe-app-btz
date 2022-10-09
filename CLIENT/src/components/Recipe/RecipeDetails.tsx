import Image from "next/image";
import React, { FC } from "react";
import { RecipeDetailsModel } from "../../models/RecipeModels";

const RecipeDetails: FC<
  Omit<RecipeDetailsModel, "ingredients" | "nutrients" | "steps">
> = ({ id, image, title, description, duration }) => {
  return (
    <div className="my-6 text-center">
      <Image
        className="rounded-xl shadow-sm"
        src={image}
        alt={id}
        width={300}
        height={250}
      />
      <div className="text-lg font-medium my-1">
        {title}
        <span className="text-zinc-500 ml-1 text-base">({duration})</span>
      </div>
      <div className="text-zinc-600">{description}</div>
    </div>
  );
};

export default RecipeDetails;
