import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { TopRatedRecipeModel } from "../../models/RecipeModels";
import TopRatedRecipeCard from "./TopRatedRecipeCard";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../redux/reducers/notificationReducer";
import { NotificationTypes } from "../../models/NotificationModel";

const TopRated = () => {
  return (
    <div>
      <div className="font-medium text-xl mb-3">Top Rated Recipes🔥</div>
      <RecipesCarousel />
    </div>
  );
};

const RecipesCarousel = () => {
  const dispatch = useDispatch();
  const [topRatedRecipes, setTopRatedRecipes] = useState<TopRatedRecipeModel[]>(
    []
  );

  const { axiosRequest } = useAxiosRequest();

  const getTopRatedRecipes = () => {
    const successAction = (res: AxiosResponse) => {
      const { recipes } = res.data as { recipes: TopRatedRecipeModel[] };

      setTopRatedRecipes(recipes);
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Could not get top rated recipes.",
          type: NotificationTypes.Error,
        })
      );
    };

    axiosRequest(
      "get",
      "http://localhost:5000/api/recipes/top-rated",
      {},
      successAction,
      errorAction
    );
  };

  useEffect(() => {
    getTopRatedRecipes();
  }, []);

  const getSlides = () => {
    return topRatedRecipes.map((recipe) => {
      const { duration, _id, likes, recipeName, image, creatorUsername } =
        recipe;

      return (
        <SwiperSlide key={recipe._id}>
          <TopRatedRecipeCard
            _id={_id}
            likes={likes}
            image={image}
            duration={duration}
            recipeName={recipeName}
            creatorUsername={creatorUsername}
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
