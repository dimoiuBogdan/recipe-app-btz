import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NotificationTypes } from "../models/NotificationModel";
import { NotificationActions } from "../redux/reducers/notificationReducer";

const useAxiosRequest = () => {
    const dispatch = useDispatch();
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
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController)

        axios({
            method,
            headers: {
                "Content-Type": "application/json",
            },
            url,
            data: JSON.stringify(data),
        })
            .then((res) => {
                clearHttpRequestControllerAfterCompletion(httpAbortController)
                successAction(res);
            })
            .catch((err: AxiosError) => {
                const { message } = err.response?.data as { message: string, args: any }

                dispatch(NotificationActions.setPopupProperties({
                    content: message || "Sorry, something went wrong",
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