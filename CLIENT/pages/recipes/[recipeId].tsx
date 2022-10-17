import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../../src/components/Recipe/Navbar";
import RecipeDetails from "../../src/components/Recipe/RecipeDetails";
import RecipeIngredients from "../../src/components/Recipe/RecipeIngredients";
import RecipeNutrients from "../../src/components/Recipe/RecipeNutrients";
import RecipePreparation from "../../src/components/Recipe/RecipePreparation";
import useAxiosRequest from "../../src/hooks/useAxiosRequest";
import { RecipeDetailsModel } from "../../src/models/RecipeModels";

const RecipePage = () => {
  const router = useRouter();
  const { recipeId } = router.query as { recipeId: string };
  const { axiosRequest } = useAxiosRequest();

  const successAction = (res: AxiosResponse) => {
    console.log(res);
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

  const DUMMY_RECIPE_DETAILS: RecipeDetailsModel = {
    description: "Healthy pancakes combine with grapes.",
    id: "r-435",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bestviolet.com%2Ffast-food-logo.jpg&f=1&nofb=1&ipt=09f17a6d679b013e15f0980f59ed1b295961ccd59bd9bcd7ac0b14dd11590f4a&ipo=images",
    title: "Grape Pancake",
    duration: "20 minutes",
    ingredients: [
      {
        quantity: "200 grams",
        title: "White flour",
      },
      {
        quantity: "300 ml",
        title: "Egg whites",
      },
      {
        quantity: "1 cup",
        title: "Oats",
      },
      {
        quantity: "2 teaspoons",
        title: "Sugar",
      },
      {
        quantity: "1 tablespoon",
        title: "Grape Jam",
      },
    ],
    nutrients: [
      {
        title: "Protein",
        quantity: "50g",
      },
      {
        title: "Carbs",
        quantity: "120g",
      },
      {
        title: "Fat",
        quantity: "6g",
      },
      {
        title: "Calories",
        quantity: "120kcal",
      },
    ],
    steps: [
      { description: "This will be your first step." },
      {
        description:
          "This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step. This will be your second step.",
      },
      { description: "This will be your third step." },
      { description: "This will be your fourth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
      { description: "This will be your fifth step." },
    ],
  };

  return (
    <div>
      <Navbar />
      <RecipeDetails
        id={recipeId}
        image={DUMMY_RECIPE_DETAILS.image}
        title={DUMMY_RECIPE_DETAILS.title}
        duration={DUMMY_RECIPE_DETAILS.duration}
        description={DUMMY_RECIPE_DETAILS.description}
      />

      <RecipeNutrients nutrients={DUMMY_RECIPE_DETAILS.nutrients} />
      <RecipeIngredients ingredients={DUMMY_RECIPE_DETAILS.ingredients} />
      <RecipePreparation steps={DUMMY_RECIPE_DETAILS.steps} />
    </div>
  );
};

export default RecipePage;
