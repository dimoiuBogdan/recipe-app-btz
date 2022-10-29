import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaRegClock } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { Waypoint } from "react-waypoint";
import { AllRecipeModel } from "../../models/RecipeModels";

type AllRecipesCardsProps = {
  perPage: number;
  allRecipes: AllRecipeModel[];
  setPerPage: Dispatch<SetStateAction<number>>;
};
const AllRecipesCards: FC<AllRecipesCardsProps> = ({
  perPage,
  allRecipes,
  setPerPage,
}) => {
  const getAllRecipesContent = () => {
    return allRecipes?.map((recipe, index) => {
      const {
        creator,
        duration,
        image,
        recipeName,
        type,
        creatorUsername,
        _id,
      } = recipe;

      const isLastElement = index + 1 === perPage;

      return (
        <>
          {isLastElement && (
            <Waypoint
              key={`${_id}-waypoint`}
              onEnter={() => {
                setPerPage((prev) => prev + 10);
              }}
            />
          )}
          <AllRecipeCard
            _id={_id}
            key={_id}
            type={type}
            image={image}
            recipeName={recipeName}
            creator={creator}
            creatorUsername={creatorUsername}
            duration={duration}
          />
        </>
      );
    });
  };

  return <div className="flex flex-wrap">{getAllRecipesContent()}</div>;
};

export default AllRecipesCards;

const AllRecipeCard: FC<AllRecipeModel> = ({
  _id,
  type,
  image,
  creator,
  creatorUsername,
  duration,
  recipeName,
}) => {
  const router = useRouter();

  const redirectToRecipeDetails = () => {
    router.push({
      pathname: "/recipes/[recipeId]",
      query: { recipeId: _id },
    });
  };

  return (
    <div onClick={redirectToRecipeDetails} className="w-1/2 p-2">
      <div className="bg-orange-200 bg-opacity-70 shadow-sm rounded-md p-3 cursor-pointer hover:shadow-lg text-zinc-500">
        <div className="flex">
          <Image
            className="rounded-lg object-cover object-center shadow-sm"
            width="120"
            height="100"
            alt={recipeName}
            src={image}
          />
          <div className="ml-2 flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm font-medium">{type.toUpperCase()}</div>
              <div className="bg-orange-400 text-orange-200 rounded-full shadow-lg p-1">
                <ImSpoonKnife />
              </div>
            </div>
            <div>
              <div className="text-lg font-medium text-orange-700">
                {recipeName}
              </div>
              <div className="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden w-4/5">
                <span className="font-normal">by </span>
                {creatorUsername.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FaRegClock />
              <div className="ml-1">{duration}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
