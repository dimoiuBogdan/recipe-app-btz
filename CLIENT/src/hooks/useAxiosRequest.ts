import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../models/AuthModel";
import { NotificationTypes } from "../models/NotificationModel";
import { AuthContext } from "../redux/AuthContext";
import { LoadingActions } from "../redux/reducers/loadingReducer";
import { NotificationActions } from "../redux/reducers/notificationReducer";
import { RootState } from "../redux/reducers/reducers";

const useAxiosRequest = () => {
    const dispatch = useDispatch();
    const { token } = useContext(AuthContext);
    const activeHttpRequests = useRef<AbortController[]>([]);


    useEffect(() => {
        return () => {
            clearPreviousHttpRequests()
        }
    }, [])

    const clearPreviousHttpRequests = () => {
        activeHttpRequests.current.forEach(controller => controller.abort())
    }

    const clearHttpRequestControllerAfterCompletion = (currentController: AbortController) => {
        activeHttpRequests.current = activeHttpRequests.current.filter(controller => controller !== currentController)
    }

    const axiosRequest = useCallback((
        method: 'post' | 'get' | 'delete' | 'patch',
        url: string, data: any,
        successAction: (res: AxiosResponse<any, any>) => void,
        errorAction: (err: AxiosError) => void,
        finallyAction?: () => void
    ) => {
        dispatch(LoadingActions.setLoading(true))

        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController)

        axios({
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            url,
            data: JSON.stringify(data),
        })
            .then((res) => {
                clearHttpRequestControllerAfterCompletion(httpAbortController)
                successAction(res);
            })
            .catch((err: AxiosError) => {
                dispatch(NotificationActions.setPopupProperties({
                    content: "Sorry, something went wrong",
                    type: NotificationTypes.Error
                }))
                errorAction(err);
            })
            .finally(() => { dispatch(LoadingActions.setLoading(false)); finallyAction && finallyAction() })
    }, [])


    return {
        axiosRequest
    }
}

export default useAxiosRequest;