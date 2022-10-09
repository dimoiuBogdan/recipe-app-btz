import React, { FC } from "react";
import { RecipeDetailsNutrientsModel } from "../../models/RecipeModels";

type RecipeNutrientsProps = {
  nutrients: RecipeDetailsNutrientsModel[];
};
const RecipeNutrients: FC<RecipeNutrientsProps> = ({ nutrients }) => {
  const getContent = () => {
    return nutrients.map((nutrient, index) => {
      const { quantity, title } = nutrient;

      return (
        <Nutrient key={index} index={index} quantity={quantity} title={title} />
      );
    });
  };

  return (
    <div className="my-4">
      <div className="mb-2 text-lg font-medium">Nutrients</div>
      <div className="flex items-center justify-between flex-wrap">
        {getContent()}
      </div>
    </div>
  );
};

type NutrientProps = {
  index: number;
  title: string;
  quantity: string;
};
const Nutrient: FC<NutrientProps> = ({ quantity, title, index }) => {
  return (
    <div className="flex font-medium w-1/4 mb-2">
      <div className="ellipsis text-zinc-700">{title}</div>
      <div className="ellipsis text-orange-600 ml-3">{quantity}</div>
    </div>
  );
};

export default RecipeNutrients;
