import { FC, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationState,
  NotificationTypes,
} from "../../models/NotificationModel";
import { NotificationActions } from "../../redux/reducers/notificationReducer";
import { RootState } from "../../redux/reducers/reducers";

const NotificationPopup: FC<any> = () => {
  const dispatch = useDispatch();

  const { content, isOpened, type, life } = useSelector<
    RootState,
    NotificationState
  >((s) => s.notificationReducer);

  const getNotificationBackground = () => {
    if (type) {
      if (type === NotificationTypes.Error) return "bg-red-200";

      if (type === NotificationTypes.Success) return "bg-green-200";

      if (type === NotificationTypes.Warning) return "bg-orange-300";
    }

    return "bg-white";
  };

  const getNotificationTitle = () => {
    if (type) {
      return type.toUpperCase();
    }

    return "NOTIFICATION";
  };

  const closeNotification = () => {
    console.log("cleanNotification clg");
    dispatch(NotificationActions.closeNotification());
  };

  const closeNotificationTimeout = isOpened
    ? setTimeout(closeNotification, life)
    : 1;

  useEffect(() => {
    return () => {
      console.log("clearTimeout clg");
      clearTimeout(closeNotificationTimeout);
    };
  }, [closeNotificationTimeout]);

  const notificationPopupClassName = `${getNotificationBackground()} text-black fixed py-2 px-4 right-[10vw] top-12 z-50 rounded-lg shadow-lg min-w-[250px]`;
  const closePopupClassName =
    "text-2xl font-bold text-zinc-900 cursor-pointer hover:scale-110";
  const contentClassName = "max-w-xs";

  return (
    <>
      {isOpened && (
        <div className={notificationPopupClassName}>
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium text-lg">{getNotificationTitle()}</div>
            <IoMdClose
              onClick={closeNotification}
              className={closePopupClassName}
            />
          </div>
          <div className={contentClassName}>{content}</div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
