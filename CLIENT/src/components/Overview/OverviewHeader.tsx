import { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { NotificationTypes } from "../../models/NotificationModel";
import { UserModel } from "../../models/UserModels";
import { AuthContext } from "../../redux/AuthContext";
import { NotificationActions } from "../../redux/reducers/notificationReducer";
import PlaceholderProfileImage from "../../resources/images/profile_image_placeholder.png";

const OverviewHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { axiosRequest } = useAxiosRequest();
  const { userId } = useContext(AuthContext);
  const [currentUserDetails, setCurrentUserDetails] = useState<
    UserModel | undefined
  >(undefined);

  const redirectToProfile = () => {
    router.push("/profile");
  };

  const getUserDetails = () => {
    const successAction = (res: AxiosResponse) => {
      const { user } = res.data as { user: UserModel };

      setCurrentUserDetails(user);
    };

    const errorAction = (err: AxiosError) => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Something went wrong retrevieng your details.",
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

  if (!currentUserDetails || !userId) {
    return;
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-zinc-600 font-medium">Good afternoon,</div>
        <div className="font-medium text-xl">{currentUserDetails.username}</div>
      </div>
      <Image
        onClick={redirectToProfile}
        className="rounded-full shadow-md overflow-hidden cursor-pointer"
        src={currentUserDetails.image || PlaceholderProfileImage}
        width="60"
        height="60"
        alt="profile_image"
      />
    </div>
  );
};

export default OverviewHeader;
