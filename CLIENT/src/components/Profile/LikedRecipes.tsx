import { AxiosResponse, AxiosError } from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { NotificationTypes } from "../../models/NotificationModel";
import { AllRecipeModel } from "../../models/RecipeModels";
import { AuthContext } from "../../redux/AuthContext";
import { NotificationActions } from "../../redux/reducers/notificationReducer";
import AllRecipesCards from "../Overview/AllRecipesCards";

const LikedRecipes: FC<any> = () => {
  const dispatch = useDispatch();
  const { axiosRequest } = useAxiosRequest();
  const { userId } = useContext(AuthContext);

  const [perPage, setPerPage] = useState<number>(4);
  const [likedRecipes, setLikedRecipes] = useState<AllRecipeModel[]>([]);

  const getLikedRecipes = () => {
    const successAction = (res: AxiosResponse) => {
      const { recipes } = res.data as {
        recipes: AllRecipeModel[];
      };

      setLikedRecipes([...likedRecipes, ...recipes]);
    };

    const errorAction = (err: AxiosError) => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Something went wrong retrieving favorite recipes.",
          type: NotificationTypes.Error,
        })
      );
    };

    axiosRequest(
      "get",
      `http://localhost:5000/api/recipes/favorites/${userId}?perPage=${perPage}`,
      {},
      successAction,
      errorAction
    );
  };

  useEffect(() => {
    if (userId) {
      getLikedRecipes();
    }
  }, [perPage]);

  return (
    <div className="mb-4">
      <div className="font-medium text-xl mb-3">Liked Recipes⭐</div>
      <AllRecipesCards
        perPage={perPage}
        setPerPage={setPerPage}
        allRecipes={likedRecipes}
        loadMoreButton={true}
      />
    </div>
  );
};

export default LikedRecipes;
