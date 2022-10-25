import React, { FC } from "react";
import { RecipeIngredientsModel } from "../../models/RecipeModels";

type RecipeIngredientsProps = {
  ingredients: RecipeIngredientsModel[];
};
const RecipeIngredients: FC<RecipeIngredientsProps> = ({ ingredients }) => {
  const getContent = () => {
    return ingredients.map((ingredient, index) => {
      const { quantity, title } = ingredient;
      return <Ingredient key={index} quantity={quantity} title={title} />;
    });
  };

  const getItemsTerm = ingredients?.length === 1 ? "item" : "items";

  return (
    <div className="mt-8">
      <div className="flex items-baseline">
        <div className="mb-2 text-lg font-medium">Ingredients</div>
        <div className="text-zinc-500 ml-1">
          ({ingredients.length} {getItemsTerm})
        </div>
      </div>
      <div className="flex flex-wrap">{getContent()}</div>
    </div>
  );
};

type IngredientProps = {
  title: string;
  quantity: string;
};
const Ingredient: FC<IngredientProps> = ({ quantity, title }) => {
  return (
    <div className="w-1/5 font-medium flex-wrap mb-4">
      <div className="ellipsis text-zinc-700">{title}</div>
      <div className="text-zinc-500 ellipsis">{quantity}</div>
    </div>
  );
};

export default RecipeIngredients;
