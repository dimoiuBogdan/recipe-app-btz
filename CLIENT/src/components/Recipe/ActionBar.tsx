import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { NotificationTypes } from "../../models/NotificationModel";
import { AuthContext } from "../../redux/AuthContext";
import { NotificationActions } from "../../redux/reducers/notificationReducer";

type ActionBarProps = {
  recipeId: string;
  isShown: boolean;
  creatorId: string;
  getRecipeDetails: () => void;
};
const ActionBar: FC<ActionBarProps> = ({
  isShown,
  recipeId,
  creatorId,
  getRecipeDetails,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { axiosRequest } = useAxiosRequest();
  const { userId } = useContext(AuthContext);

  const recipeBelongsToConnectedUser = creatorId && userId === creatorId;

  const deleteRecipe = () => {
    axiosRequest(
      "delete",
      `http://localhost:5000/api/recipes/${recipeId}`,
      {},
      (res: AxiosResponse) => {
        dispatch(
          NotificationActions.setPopupProperties({
            content: "Recipe deleted successfully, you will now be redirected",
            type: NotificationTypes.Success,
          })
        );

        setTimeout(() => {
          router.replace("/overview");
        }, 1500);
      },
      (err: AxiosError) => {
        console.log(err);

        dispatch(
          NotificationActions.setPopupProperties({
            content: "Recipe could not be deleted",
            type: NotificationTypes.Error,
          })
        );
      }
    );
  };

  const likeRecipe = () => {
    const successAction = (res: AxiosResponse) => {
      getRecipeDetails();

      dispatch(
        NotificationActions.setPopupProperties({
          content: "Recipe liked.",
          type: NotificationTypes.Success,
        })
      );
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);

      dispatch(
        NotificationActions.setPopupProperties({
          content: "Could not like recipe.",
          type: NotificationTypes.Error,
        })
      );
    };

    axiosRequest(
      "post",
      `http://localhost:5000/api/recipes/like/${recipeId}`,
      {},
      successAction,
      errorAction
    );
  };

  if (!isShown) {
    return <></>;
  }

  return (
    <div className="absolute top-6 overflow-hidden shadow-md w-44 rounded-lg text-base">
      <ActionBarElement action={likeRecipe} text="Like" />
      <ActionBarElement
        action={() => {
          console.log("1");
        }}
        text="Share"
      />
      {recipeBelongsToConnectedUser && (
        <>
          <ActionBarElement action={deleteRecipe} text="Delete" />
          <ActionBarElement
            action={() => {
              console.log("3");
            }}
            text="Edit"
          />
        </>
      )}
    </div>
  );
};

export default ActionBar;

type ActionBarElementProps = {
  text: string;
  action: () => void;
};
const ActionBarElement: FC<ActionBarElementProps> = ({ text, action }) => {
  return (
    <div
      onClick={action}
      className="py-1 px-2 bg-orange-200 bg-opacity-50 hover:bg-opacity-75 cursor-pointer"
    >
      <div>{text}</div>
    </div>
  );
};
