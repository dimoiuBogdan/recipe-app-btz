import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { FaRegClock } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { RECIPE_DETAILS_ROUTE } from "../../constants/routes";
import { AllRecipeModel, RecipeFilterTypes } from "../../models/RecipeModels";

const AllRecipesCards: FC<any> = () => {
  const allRecipes: AllRecipeModel[] = [
    {
      id: "r-1",
      creator: "Dimoiu Bogdan",
      duration: "2h 20min",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bestviolet.com%2Ffast-food-logo.jpg&f=1&nofb=1&ipt=09f17a6d679b013e15f0980f59ed1b295961ccd59bd9bcd7ac0b14dd11590f4a&ipo=images",
      title: "Cereal Bowl",
      type: RecipeFilterTypes.Breakfast,
    },
    {
      id: "r-2",
      creator: "Chiorean Andrei",
      duration: "5min",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Z2UqjvJJVRaPzyCvj8ZNMAHaE8%26pid%3DApi&f=1&ipt=150a91894a7fc6ac8b728e4952c82bafe15b2c08fb9b79346e601f4cd9ea452c&ipo=images",
      title: "Orice la airfryer",
      type: RecipeFilterTypes.Dinner,
    },
    {
      id: "r-3",
      creator: "Un fecior Perfect",
      duration: "69h",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyukiosteriyaki.com%2Flibrary%2Fsite%2FSushi-rolls-with-wassabi.jpgsQDCkUlyQ.MQoCf5U0Sm2_K2tad4PVYV&f=1&nofb=1&ipt=7522d2390da69d5001f8080cf32a71d563df6fbac92d38392ef91bd047604bc0&ipo=images",
      title: "Un pui",
      type: RecipeFilterTypes.Lunch,
    },
  ];

  const getAllRecipesContent = () => {
    return allRecipes.map((recipe) => {
      const { creator, duration, image, title, type, id } = recipe;

      return (
        <AllRecipeCard
          id={id}
          key={id}
          type={type}
          image={image}
          title={title}
          creator={creator}
          duration={duration}
        />
      );
    });
  };

  return <div className="flex flex-wrap">{getAllRecipesContent()}</div>;
};

export default AllRecipesCards;

const AllRecipeCard: FC<AllRecipeModel> = ({
  id,
  type,
  image,
  title,
  creator,
  duration,
}) => {
  const router = useRouter();

  const redirectToRecipeDetails = () => {
    router.push({
      pathname: "/recipes/[recipeId]",
      query: { recipeId: id },
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
            alt={title}
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
              <div className="text-lg font-medium text-orange-700">{title}</div>
              <div className="text-sm font-medium">
                <span className="font-normal">by </span>
                {creator.toUpperCase()}
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
