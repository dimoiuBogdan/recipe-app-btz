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

  const [perPage, setPerPage] = useState<number>(10);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [allRecipes, setAllRecipes] = useState<AllRecipeModel[]>([]);

  const filteredSuccessAction = (res: AxiosResponse) => {
    const { recipes } = res.data as { recipes: AllRecipeModel[] };

    setAllRecipes([...allRecipes, ...recipes]);
  };

  const successAction = (res: AxiosResponse) => {
    const { recipes } = res.data as { recipes: AllRecipeModel[] };

    setAllRecipes([...allRecipes, ...recipes]);
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
    if (selectedFilter) {
      axiosRequest(
        "post",
        `http://localhost:5000/api/recipes/filtered-recipes?perPage=${perPage}`,
        {
          filter: selectedFilter,
        },
        filteredSuccessAction,
        errorAction
      );
    } else {
      axiosRequest(
        "get",
        `http://localhost:5000/api/recipes?perPage=${perPage}`,
        {},
        successAction,
        errorAction
      );
    }
  }, [perPage, selectedFilter]);

  useEffect(() => {
    setPerPage(10);
    setAllRecipes([]);
  }, [selectedFilter]);

  return (
    <div className="mt-6">
      <div className="font-medium text-xl">All Recipes🍔</div>
      <AllRecipesFilters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <AllRecipesCards
        perPage={perPage}
        allRecipes={allRecipes}
        setPerPage={setPerPage}
      />
    </div>
  );
};

export default AllRecipes;
