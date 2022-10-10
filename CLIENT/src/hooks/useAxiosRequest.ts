import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../models/AuthModel";
import { NotificationTypes } from "../models/NotificationModel";
import { NotificationActions } from "../redux/reducers/notificationReducer";
import { RootState } from "../redux/reducers/reducers";

const useAxiosRequest = () => {
    const dispatch = useDispatch();
    const activeHttpRequests = useRef<AbortController[]>([]);

    const { token } = useSelector<RootState, AuthState>(s => s.authReducer)

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
            .finally(() => finallyAction && finallyAction())
    }, [])


    return {
        axiosRequest
    }
}

export default useAxiosRequest;