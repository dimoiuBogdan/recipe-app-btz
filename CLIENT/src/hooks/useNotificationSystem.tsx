import { useDispatch } from "react-redux";
import { NotificationTypes } from "../models/NotificationModel";
import { NotificationActions } from "../redux/reducers/notificationReducer";

const useNotificationSystem = () => {
  const dispatch = useDispatch();

  const setNotification = (type: NotificationTypes, content: string) => {
    dispatch(
      NotificationActions.setPopupProperties({
        content: content || "Something went wrong",
        type,
      })
    );
  };

  return { setNotification };
};

export default useNotificationSystem;
