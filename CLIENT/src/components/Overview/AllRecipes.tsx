import React, { FC } from "react";
import AllRecipesCards from "./AllRecipesCards";
import AllRecipesFilters from "./AllRecipesFilters";

const AllRecipes: FC<any> = () => {
  return (
    <div className="mt-6">
      <div className="font-medium text-xl">All Recipes🍔</div>
      <AllRecipesFilters />
      <AllRecipesCards />
    </div>
  );
};

export default AllRecipes;
