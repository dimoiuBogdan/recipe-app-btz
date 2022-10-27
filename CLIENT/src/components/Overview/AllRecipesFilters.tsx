import { AxiosError, AxiosResponse } from "axios";
import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import {
  AllRecipeModel,
  RecipeFiltersModel,
  RecipeType,
} from "../../models/RecipeModels";

type AllRecipesFiltersProps = {
  setAllRecipes: Dispatch<SetStateAction<AllRecipeModel[]>>;
};
const AllRecipesFilters: FC<AllRecipesFiltersProps> = ({ setAllRecipes }) => {
  const { axiosRequest } = useAxiosRequest();
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const recipesFilters: RecipeFiltersModel[] = [
    {
      content: "Breakfast🍳",
      filterId: RecipeType.Breakfast,
    },
    {
      content: "Lunch🍕",
      filterId: RecipeType.Lunch,
    },
    {
      content: "Snack🥪",
      filterId: RecipeType.Snack,
    },
    {
      content: "Dinner🥘",
      filterId: RecipeType.Dinner,
    },
  ];

  const getRecipeFiltersContent = () => {
    return recipesFilters.map((filter) => {
      const { content, filterId } = filter;

      return (
        <Filter
          key={filterId}
          content={content}
          filterId={filterId}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      );
    });
  };

  const filterRecipes = () => {
    const successAction = (res: AxiosResponse) => {
      const { recipes } = res.data as { recipes: AllRecipeModel[] };

      setAllRecipes(recipes);
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);
    };

    if (selectedFilter) {
      axiosRequest(
        "post",
        "http://localhost:5000/api/recipes/filtered-recipes",
        {
          filter: selectedFilter,
        },
        successAction,
        errorAction
      );
    } else {
      axiosRequest(
        "get",
        "http://localhost:5000/api/recipes",
        {},
        successAction,
        errorAction
      );
    }
  };

  useEffect(() => {
    filterRecipes();
  }, [selectedFilter]);

  return (
    <div className="flex gap-6 mt-3 mb-6">{getRecipeFiltersContent()}</div>
  );
};

type FilterType = {
  content: string;
  filterId: string;
  selectedFilter: string;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
};
const Filter: FC<FilterType> = ({
  content,
  filterId,
  selectedFilter,
  setSelectedFilter,
}) => {
  const highlitRecipes = () => {
    if (filterId === selectedFilter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filterId);
    }
  };

  const filterColor =
    filterId === selectedFilter ? "bg-orange-400" : "bg-orange-200";

  return (
    <div
      onClick={highlitRecipes}
      className={`shadow-md rounded-lg py-0.5 w-24 text-center hover:shadow-lg cursor-pointer bg-opacity-50 ${filterColor}`}
    >
      {content}
    </div>
  );
};

export default AllRecipesFilters;
