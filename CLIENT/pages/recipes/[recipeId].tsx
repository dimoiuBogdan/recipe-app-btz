import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../src/components/Recipe/Navbar";
import RecipeDetails from "../../src/components/Recipe/RecipeDetails";
import RecipeIngredients from "../../src/components/Recipe/RecipeIngredients";
import RecipeNutrients from "../../src/components/Recipe/RecipeNutrients";
import RecipePreparation from "../../src/components/Recipe/RecipePreparation";
import useAxiosRequest from "../../src/hooks/useAxiosRequest";
import { RecipeDetailsModel, RecipeType } from "../../src/models/RecipeModels";

const RecipePage = () => {
  const router = useRouter();
  const { recipeId } = router.query as { recipeId: string };
  const { axiosRequest } = useAxiosRequest();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsModel>({
    likes: 0,
    image: "",
    creator: "",
    duration: "",
    recipeName: "",
    description: "",
    creatorUsername: "",
    type: RecipeType.Breakfast,
    steps: [],
    nutrients: [],
    ingredients: [],
  });

  const getRecipeDetails = () => {
    const successAction = (res: AxiosResponse) => {
      const {
        data: { recipeDetails },
      } = res;

      setRecipeDetails(recipeDetails);
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);
    };

    axiosRequest(
      "get",
      `http://localhost:5000/api/recipes/${recipeId}/details`,
      {},
      successAction,
      errorAction
    );
  };

  useEffect(() => {
    if (recipeId) {
      getRecipeDetails();
    }
  }, [recipeId]);

  return (
    <div>
      <Navbar
        recipeId={recipeId}
        creatorId={recipeDetails.creator}
        getRecipeDetails={getRecipeDetails}
      />
      <RecipeDetails
        likes={recipeDetails.likes}
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
