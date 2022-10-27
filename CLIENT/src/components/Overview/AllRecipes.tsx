import { AxiosResponse, AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { NotificationTypes } from "../../models/NotificationModel";
import { AllRecipeModel } from "../../models/RecipeModels";
import { NotificationActions } from "../../redux/reducers/notificationReducer";
import AllRecipesCards from "./AllRecipesCards";
import AllRecipesFilters from "./AllRecipesFilters";

const AllRecipes: FC<any> = () => {
  const { axiosRequest } = useAxiosRequest();
  const dispatch = useDispatch();

  const [allRecipes, setAllRecipes] = useState<AllRecipeModel[]>([]);

  const successAction = (res: AxiosResponse) => {
    const { recipes } = res.data as { recipes: AllRecipeModel[] };

    setAllRecipes(recipes);
  };

  const errorAction = (err: AxiosError) => {
    console.log(err);

    dispatch(
      NotificationActions.setPopupProperties({
        content: "Something went wrong retrieving all recipes",
        type: NotificationTypes.Error,
      })
    );
  };

  useEffect(() => {
    axiosRequest(
      "get",
      "http://localhost:5000/api/recipes",
      {},
      successAction,
      errorAction
    );
  }, []);

  return (
    <div className="mt-6">
      <div className="font-medium text-xl">All Recipes🍔</div>
      <AllRecipesFilters setAllRecipes={setAllRecipes} />
      <AllRecipesCards allRecipes={allRecipes} />
    </div>
  );
};

export default AllRecipes;
