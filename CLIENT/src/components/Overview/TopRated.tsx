import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { TopRatedRecipe } from "../../models/RecipeModels";
import TopRatedRecipeCard from "./TopRatedRecipeCard";

const TopRated = () => {
  return (
    <div>
      <div className="font-medium text-xl mb-3">Top Rated Recipes🔥</div>
      <RecipesCarousel />
    </div>
  );
};

const RecipesCarousel = () => {
  const topRatedRecipes: TopRatedRecipe[] = [
    {
      id: "dummy-id-1",
      duration: "20 min",
      likes: 100,
      title: "Protein Pancakes",
      creator: "Andrei",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Z2UqjvJJVRaPzyCvj8ZNMAHaE8%26pid%3DApi&f=1&ipt=150a91894a7fc6ac8b728e4952c82bafe15b2c08fb9b79346e601f4cd9ea452c&ipo=images",
    },
    {
      id: "dummy-id-2",
      duration: "10 min",
      likes: 23,
      title: "Toasted Sandwich",
      creator: "Pingu",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bestviolet.com%2Ffast-food-logo.jpg&f=1&nofb=1&ipt=09f17a6d679b013e15f0980f59ed1b295961ccd59bd9bcd7ac0b14dd11590f4a&ipo=images",
    },
    {
      id: "dummy-id-3",
      duration: "2 min",
      likes: 55,
      title: "Protein Shake",
      creator: "Bogdan",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F25sios4b2ym4h547i3a1wrq1-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2015%2F09%2Fchocolate-mocha-protein-shake-recipe-735x948.jpg&f=1&nofb=1&ipt=793d695cbbafac65a0608bd967b7da13848bd2fada0120b4908e06b324ce2fda&ipo=images",
    },
    {
      id: "dummy-id-4",
      duration: "12 min",
      likes: 355,
      title: "Chicken Shaorma",
      creator: "Darius",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyukiosteriyaki.com%2Flibrary%2Fsite%2FSushi-rolls-with-wassabi.jpgsQDCkUlyQ.MQoCf5U0Sm2_K2tad4PVYV&f=1&nofb=1&ipt=7522d2390da69d5001f8080cf32a71d563df6fbac92d38392ef91bd047604bc0&ipo=images",
    },
    {
      id: "dummy-id-5",
      duration: "35 min",
      likes: 525,
      title: "Lidl Pizza",
      creator: "Radu",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mashed.com%2Fimg%2Fuploads%2F2017%2F03%2Fpizza.jpg&f=1&nofb=1&ipt=db708f4497f2932ef8d6d6c5967c1fd0aaff3d07de52a45ec6c13a621f9d492f&ipo=images",
    },
  ];

  const getSlides = () => {
    return topRatedRecipes.map((recipe) => {
      const { duration, id, likes, title, image, creator } = recipe;

      return (
        <SwiperSlide className="cursor-pointer" key={recipe.id}>
          <TopRatedRecipeCard
            id={id}
            likes={likes}
            title={title}
            image={image}
            creator={creator}
            duration={duration}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper spaceBetween={15} slidesPerView={2.5} grabCursor={true}>
      {getSlides()}
    </Swiper>
  );
};

export default TopRated;
