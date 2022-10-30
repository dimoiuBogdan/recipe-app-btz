import { AxiosResponse, AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AllRecipesCards from "../../src/components/Overview/AllRecipesCards";
import InitialsProfileImage from "../../src/components/Overview/InitialsProfileImage";
import LikedRecipes from "../../src/components/Profile/LikedRecipes";
import PersonalRecipes from "../../src/components/Profile/PersonalRecipes";
import UserImage from "../../src/components/UserImage/UserImage";
import useAxiosRequest from "../../src/hooks/useAxiosRequest";
import { NotificationTypes } from "../../src/models/NotificationModel";
import { AllRecipeModel } from "../../src/models/RecipeModels";
import { UserModel } from "../../src/models/UserModels";
import { AuthContext } from "../../src/redux/AuthContext";
import { NotificationActions } from "../../src/redux/reducers/notificationReducer";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const { axiosRequest } = useAxiosRequest();

  const [userDetails, setUserDetails] = useState<UserModel | undefined>(
    undefined
  );

  const getUserDetails = () => {
    const successAction = (res: AxiosResponse) => {
      const { user } = res.data as { user: UserModel };

      setUserDetails(user);
    };

    const errorAction = (err: AxiosError) => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Something went wrong retrieving your details.",
          type: NotificationTypes.Error,
        })
      );
    };

    axiosRequest(
      "get",
      `http://localhost:5000/api/users/${userId}`,
      {},
      successAction,
      errorAction
    );
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm text-zinc-600 font-medium">
            Welcome to your profile,
          </div>
          <div className="font-medium text-xl">{userDetails.username}</div>
        </div>
        <UserImage
          showEditIcon
          image={userDetails.image}
          username={userDetails.username}
        />
      </div>
      <LikedRecipes />
      <PersonalRecipes />
    </div>
  );
};

export default ProfilePage;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
