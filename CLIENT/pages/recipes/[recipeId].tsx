import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../src/components/Recipe/Navbar";
import RecipeDetails from "../../src/components/Recipe/RecipeDetails";
import RecipeIngredients from "../../src/components/Recipe/RecipeIngredients";
import RecipeNutrients from "../../src/components/Recipe/RecipeNutrients";
import RecipePreparation from "../../src/components/Recipe/RecipePreparation";
import useAxiosRequest from "../../src/hooks/useAxiosRequest";
import {
  RecipeDetailsModel,
  RecipeFilterTypes,
} from "../../src/models/RecipeModels";

const RecipePage = () => {
  const router = useRouter();
  const { recipeId } = router.query as { recipeId: string };
  const { axiosRequest } = useAxiosRequest();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsModel>({
    description: "",
    duration: "",
    image: "",
    ingredients: [],
    nutrients: [],
    steps: [],
    creator: "",
    creatorUsername: "",
    recipeName: "",
    type: RecipeFilterTypes.Breakfast,
  });

  const successAction = (res: AxiosResponse) => {
    const {
      data: { recipeDetails },
    } = res;

    setRecipeDetails(recipeDetails);
  };

  const errorAction = (err: AxiosError) => {
    console.log(err);
  };

  useEffect(() => {
    if (recipeId) {
      axiosRequest(
        "get",
        `http://localhost:5000/api/recipes/${recipeId}/details`,
        {},
        successAction,
        errorAction
      );
    }
  }, [recipeId]);

  return (
    <div>
      <Navbar />
      <RecipeDetails
        type={recipeDetails.type}
        image={recipeDetails.image}
        duration={recipeDetails.duration}
        recipeName={recipeDetails.recipeName}
        description={recipeDetails.description}
        creatorUsername={recipeDetails.creatorUsername}
      />

      <RecipeNutrients nutrients={recipeDetails.nutrients} />
      <RecipeIngredients ingredients={recipeDetails.ingredients} />
      <RecipePreparation steps={recipeDetails.steps} />
    </div>
  );
};

export default RecipePage;
